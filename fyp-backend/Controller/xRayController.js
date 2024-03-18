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
async function uploadXray(req, res){
    try{
    const xray = new XRay({
        _id: new mongoose.Types.ObjectId(),
        image: req.file.path,
        patient_id: req.params.id
    })
    const savedXRay = await xray.save();
    const url = `${process.env.Flask_URL}/predict`;
    const image_path=req.file.path;
    const image_file=req.file;

    //Create a FormData instance
    const formData = new FormData();
    // Append the file. Make sure to use 'image' as the field name to match your Flask endpoint expectation.
    // Use fs.createReadStream to read the file from the path if necessary.
    formData.append('image', fs.createReadStream(image_path));
        var response = await axios.post(url, formData, {
            headers: {
                ...formData.getHeaders()
            }
        })
        console.log(response.data)
    res.status(200).json({
        message: "XRay is uploaded successfully!",
        error: "",
        result: response.data,
        xray: req.file
    })
}
    catch(error){
        console.log(error);

        res.status(400).json({
            // message: "",
            error: error,
            xray: {}
        })
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
module.exports={
    uploadXray,
    viewXray,
    deleteXray
}