const express = require('express');
const mongoose = require('mongoose')
const createError = require("http-errors")
const XRay = require("../Model/xRayModel");
const fs = require('fs');
const path = require('path');
const axios = require("axios")
require('dotenv').config()
const { BlobServiceClient } = require('@azure/storage-blob');

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = 'cloudimages'; // The name of your container created in Azure

// Initialize Blob Service Client
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);

//for uploading single x-ray
async function uploadXray(req, res) {
    try {
        if (!req.file) {
            throw new Error("No file uploaded.");
        }
        // Initialize the XRay document
        const blobName = req.file.filename;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Read the file which has been uploaded to disk
        const fileContent = fs.readFileSync(req.file.path);
        await blockBlobClient.uploadData(fileContent, {
            blobHTTPHeaders: { blobContentType: req.file.mimetype }
        });
        // Delete the local file after uploading
        fs.unlinkSync(req.file.path);

        // Get the URL of the blob
        const imageUrl = blockBlobClient.url;

        const xray = new XRay({
            _id: new mongoose.Types.ObjectId(),
            image: imageUrl, // Store the URL instead of the local path
        });

        // Save the XRay document
        const savedXRay = await xray.save();
        
        // Make the request to the Flask server
        const response = await axios.post(`${process.env.Flask_URL}/predict`, {
                image_url: imageUrl
            });
     
        res.status(200).json({
            message: "XRay is uploaded successfully!",
            error: "",
            result: response.data,
            xray: savedXRay 
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message, // Provide a bit more detail on the error
            xray: {}
        });
    }
}

//for uploading multiple x-rays
async function uploadMultipleXrays(req, res) {
    try {
        // Initialize an array to hold the promises for saving X-rays
        const xrayPromises = req.files.map(async file => {
            // Initialize the XRay document
        const blobName = file.filename; // Or use any unique naming convention
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        // Read the file which has been uploaded to disk
        const fileContent = fs.readFileSync(file.path);
        await blockBlobClient.uploadData(fileContent, {
            blobHTTPHeaders: { blobContentType: file.mimetype }
        });
        // Delete the local file after uploading
        fs.unlinkSync(file.path);

        // Get the URL of the blob
        const imageUrl = blockBlobClient.url;

        const xray = new XRay({
            _id: new mongoose.Types.ObjectId(),
            image: imageUrl
        });
        await xray.save();
        return xray;// Collect all save promises
    });

        // Wait for all X-rays to be saved
        const savedXRays = await Promise.all(xrayPromises);

        // Prepare requests to the Flask server for each image
        const responses = await Promise.all(savedXRays.map(savedXRay => {
            return axios.post(`${process.env.Flask_URL}/predict`, {
                image_url: savedXRay.image
            });
        }));

        // Build an array of results
        const results = responses.map((response, index) => ({
            message: "XRay is uploaded and predicted successfully!",
            result: response.data,
            xray: savedXRays[index]
        }));

        res.status(200).json(results);
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message,
            xrays: []
        });
    }
}


async function viewXray(req,res){
    try{
    const xray = await XRay.findById(req.params.id);
    // const imageUrl = req.query.imageUrl; // Assuming you're passing the URL as a query parameter
    // if (!imageUrl) {
    //     throw new Error("No image URL provided.");
    // }
    if (!xray || !xray.image) {
        throw new Error("X-ray not found or image URL missing.");
    }
    // const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const url = new URL(xray.image);
        const containerName = url.pathname.split('/')[1];
        const blobName = url.pathname.substring(url.pathname.indexOf('/', 1) + 1);

        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        
        const downloadBlockBlobResponse = await blockBlobClient.download(0);
        const stream = downloadBlockBlobResponse.readableStreamBody;
    // Setting the proper content type, which you might need to handle more dynamically
    res.setHeader('Content-Type', 'image/jpeg'); // This could be dynamically retrieved or stored elsewhere
    stream.pipe(res);
    // res.status(200).json({
    //     message: "The xray image is: ",
    //     error: "",
    //     xray: xray
    // })
    }
    catch(error){
        res.status(200).json({
            error: error,
            imageUrl: {}
            // xray: {}
        })  
    }

}

async function deleteXray(req, res){
    try {
        const removedXRay = await XRay.remove({_id: req.params.id});
        res.status(200).json({
            message: "The x-ray has been deleted successfully!",
            error : "",
            deletedXray :removedXRay
        })
        
    } catch (error) {
        res.status(200).json({
            message: "",
            error : error,
            deletedXray :{}
        })
        
    }
}


async function countAttendedXrays(req, res) {
    try {
        const count = await XRay.countDocuments({ attended: true });
        res.status(200).json({
            message: "Count of attended X-Rays retrieved successfully",
            count: count
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            count: 0
        });
    }
}

module.exports={
    uploadXray,
    uploadMultipleXrays,
    viewXray,
    deleteXray,
    countAttendedXrays
}
