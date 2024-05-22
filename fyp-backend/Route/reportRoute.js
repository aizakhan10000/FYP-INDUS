const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/JWT_Tokens");
const {
    generateReport,
    viewReport,
    deleteReport,
    updateReport
} = require("../Controller/reportController");

router.post("/generate/:xrayId", verifyToken, generateReport);
router.get("/view/:id", verifyToken, viewReport);
router.delete("/delete/:id", verifyToken, deleteReport);
router.post("/update/:id", verifyToken, updateReport);

module.exports = router;
