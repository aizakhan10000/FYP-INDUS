const express = require("express");
const router = express.Router();
const {verifyAccessToken} = require("../auth/JWT_Tokens");
const {verifyJwtToken} = require("../auth/tokenVerification")
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
// router.get("/countAttendedXrays", countAttendedXrays);
// router.post("/uploadXRay/:id",upload.single('image'), uploadXray)
// router.get("/viewXray/:id", verifyAccessToken, viewXray)
// router.delete("/deleteXRay",verifyAccessToken, deleteXray)

module.exports = router