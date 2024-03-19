const express = require('express');
const mongoose = require('mongoose')
const createError = require("http-errors")
const XRay = require("../Model/xRayModel");

//for uploading single x-ray
async function uploadXray(req, res){
    try {
        // Assuming you have some way to identify the specific patient/appointment, 
        // for example through request parameters or body
        // For this example, I'll assume it's passed as part of the request body
        const { patient_id, title } = req.body; // You might need to pass and use these as well

        const xray = new XRay({
            _id: new mongoose.Types.ObjectId(),
            image: req.file.path,
            attended: true, // Set attended to true upon upload
           
            
        });
        
        const savedXRay = await xray.save();
        res.status(200).json({
            message: "XRay is uploaded successfully!",
            error: "",
            xray: savedXRay
        });
    } catch(error) {
        res.status(400).json({
            error: error,
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