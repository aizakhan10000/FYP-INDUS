const express = require("express")
const router = express.Router()

const{
    generateReport,
    viewReport,
    deleteReport,
    updateReport} = require("../Controller/reportController")

router.post("/generate/:xrayId", generateReport)
router.get("/view/:id", viewReport)
router.delete("/delete/:id",deleteReport)
router.post("/update/:id",updateReport)

module.exports = router