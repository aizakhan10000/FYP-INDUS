const mongoose = require("mongoose");

const xRaySchema= new mongoose.Schema({
    title:{
        type: String,
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