const express = require('express');
const mongoose = require('mongoose')
const createError = require("http-errors")
const XRay = require("../Model/xRayModel");

//for uploading single x-ray
async function uploadXray(req, res){
    try{
    const xray = new XRay({
        _id: new mongoose.Types.ObjectId(),
        image: req.file.path
    })
    const savedXRay = await xray.save();
    res.status(200).json({
        message: "XRay is uploaded successfully!",
        error: "",
        xray: savedXRay
    })}
    catch(error){
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