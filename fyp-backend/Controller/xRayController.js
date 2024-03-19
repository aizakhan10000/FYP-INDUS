const express = require('express');
const mongoose = require('mongoose')
const createError = require("http-errors")
const XRay = require("../Model/xRayModel");
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const axios = require("axios")
require('dotenv').config()

//for uploading single x-ray
async function uploadXray(req, res) {
    try {
        // Initialize the XRay document
        const xray = new XRay({
            _id: new mongoose.Types.ObjectId(),
            image: req.file.path,
            patient_id: req.params.id, // Ensure you're capturing patient_id correctly
        });

        // Save the XRay document
        const savedXRay = await xray.save();

        // Prepare for the Flask server request
        const url = `${process.env.Flask_URL}/predict`;
        const image_path = req.file.path;
        
        // Create a FormData instance and append the file
        const formData = new FormData();
        formData.append('image', fs.createReadStream(image_path));
        
        // Make the request to the Flask server
        const response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        });

        // Respond with success and the response from the Flask server
        res.status(200).json({
            message: "XRay is uploaded successfully!",
            error: "",
            result: response.data,
            xray: savedXRay // Changed from req.file to savedXRay for consistency
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: error.message, // Provide a bit more detail on the error
            xray: {}
        });
    }
}


async function viewXray(req,res){
    try{
    const xray = await XRay.findById(req.params.id);
    res.status(200).json({
        message: "The xray image is: ",
        error: "",
        xray: xray
    })
    }
    catch(error){
        res.status(200).json({
            error: error,
            xray: {}
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
    viewXray,
    deleteXray,
    countAttendedXrays
}
