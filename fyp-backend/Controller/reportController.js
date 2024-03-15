const express = require("express")
const Report = require("../Model/reportModel")
const createError = require("http-errors")

async function generateReport(req,res){
    try {
        const xRayId = req.params.xrayId;
        //Model Processing here
        //If conditional here according to classification of report
        res.status(200).send({
            message: "The xray report is generated successfully!",        })
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function viewReport(req,res){
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        res.status(200).send(report.content);
        
    } catch (error) {
        res.status(500).send(error.message)
    }
}
async function deleteReport(req,res){
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        if (!report) throw createError.NotFound("This report id doesnot exist!")
        const deletedReport = await Report.remove(report)
        res.status(200).json({
            message: "The report has been deleted successfully!",
            error : "",
            deletedReport : deletedReport
        })
        
    } catch (error) {
        res.status(200).json({
            message: "",
            error : error,
            deletedReport:{}
        })
    }
}
async function updateReport(req,res){
    try {
        
    } catch (error) {
        
    }
}
module.exports = {
    generateReport,
    viewReport,
    deleteReport,
    updateReport
}