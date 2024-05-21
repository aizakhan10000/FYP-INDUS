const mongoose = require("mongoose")
const XRay = require("../Model/xRayModel")

const reportModel = new mongoose.Schema({
    
    xray_id : {      // x ray picture
        type: Number,
        required: true,
        ref : 'XRay'
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
    status: {
        type: String
    }

})
const Report = mongoose.model('report',reportModel)
module.exports = Report