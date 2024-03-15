const mongoose = require("mongoose")
const XRay = require("../Model/xRayModel")

const reportModel = new mongoose.Schema({
    xray_id : {
        type: Number,
        required: true,
        ref : 'XRay'
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default : Date.now
    },
    status: {
        type: String
    }

})
const Report = mongoose.model('report',reportModel)
module.exports = Report