const mongoose = require("mongoose");
const Patient = require("../Model/patientmodel")

const xRaySchema= new mongoose.Schema({
    title:{
        type: String,
    },
    image: {
        type: String,//because it will just save the url
        required: true,
    },
    patient_id : {      // x ray picture
        type: mongoose.Types.ObjectId,
        // required: true,
        ref : 'Patients'
    },
    status:{
        type: String,
        default: "Not uploaded"
        // required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }

});

const XRay= mongoose.model("xray",xRaySchema);

module.exports=XRay;