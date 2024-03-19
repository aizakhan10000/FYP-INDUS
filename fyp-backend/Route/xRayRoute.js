const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req,file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});//executing multer; this will basically initialize it

const {
uploadXray,
viewXray,
deleteXray,
countAttendedXrays

}= require("../Controller/xRayController");

router.post("/uploadXRay",upload.single('image'),uploadXray)
router.get("/viewXray/:id", viewXray)
router.delete("/deleteXRay",deleteXray)
router.get("/countAttendedXrays", countAttendedXrays);

module.exports = router