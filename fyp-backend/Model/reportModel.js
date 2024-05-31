const mongoose = require("mongoose")
const XRay = require("../Model/xRayModel")

const reportModel = new mongoose.Schema({
    
    xray_id : {      // x ray picture
        type: mongoose.Types.ObjectId,
        required: true,
        ref : 'XRay'
    },
    patient_id : {      // x ray picture
        type: mongoose.Types.ObjectId,
        // required: true,
        ref : 'Patients'
    },
    // pateint name , radiologist name 
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default : Date.now
    }, // classification result 
    // status: {
    //     type: String
    // }

})
const Report = mongoose.model('report',reportModel)
module.exports = Report