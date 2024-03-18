const express = require("express")
const router = express.Router()
const {verifyAccessToken} = require("../auth/JWT_Tokens");
const {verifyJwtToken} = require("../auth/tokenVerification")

const{
    generateReport,
    viewReport,
    deleteReport,
    updateReport} = require("../Controller/reportController")

router.post("/generate/:xrayId", verifyAccessToken, generateReport)
router.get("/view/:id",verifyAccessToken, viewReport)
router.delete("/delete/:id",verifyAccessToken, deleteReport)
router.post("/update/:id", verifyAccessToken, updateReport)

module.exports = router