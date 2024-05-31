const express = require("express");
const router = express.Router();
//const {verifyAccessToken} = require("../auth/JWT_Tokens");
//const {verifyJwtToken} = require("../auth/tokenVerification")
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
uploadMultipleXrays,
viewXray,
deleteXray,
countAttendedXrays,
getAllXrays

}= require("../Controller/xRayController");

router.post("/uploadXRay/:id",upload.single('image'),uploadXray)
router.post("/uploadMultipleXRays",upload.array('images',50),uploadMultipleXrays)
router.get("/viewXray/:id", viewXray)
router.get("/xrays",getAllXrays)

// router.get("/viewXray", viewXray)
router.delete("/deleteXRay",deleteXray)
// router.get("/countAttendedXrays", countAttendedXrays);
// router.post("/uploadXRay/:id",upload.single('image'), uploadXray)
// router.get("/viewXray/:id", verifyAccessToken, viewXray)
// router.delete("/deleteXRay",verifyAccessToken, deleteXray)

module.exports = router