const mongoose = require("mongoose");
const Patient = require("../Model/patientmodel")

const xRaySchema= new mongoose.Schema({
    title:{
        type: String,
    },
    
    PatientID:{
        type: Number,
        required: true,
        ref: 'Patient'
    },
    attended:{
        type:Boolean,
        ref:'Appointment'
    },
    image: {
        type: String,//because it will just save the url
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

const XRay= mongoose.model("xray",xRaySchema);

module.exports=XRay;