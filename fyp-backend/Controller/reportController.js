const Report = require("../Model/reportModel");
const createError = require("http-errors");

async function generateReport(req, res) {
    try {
        const xRayId = req.params.xrayId;
        // Add your logic here to generate the report based on the xRayId
        res.status(200).send({
            message: "The x-ray report is generated successfully!",
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function viewReport(req, res) {
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        if (!report) {
            throw createError.NotFound("Report not found!");
        }
        res.status(200).send(report.content);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

async function deleteReport(req, res) {
    try {
        const reportId = req.params.id;
        const report = await Report.findById(reportId);
        if (!report) {
            throw createError.NotFound("This report ID does not exist!");
        }
        const deletedReport = await Report.deleteOne({ _id: reportId });
        res.status(200).json({
            message: "The report has been deleted successfully!",
            deletedReport: deletedReport,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete report",
            error: error.message,
        });
    }
}

async function updateReport(req, res) {
    try {
        const reportId = req.params.id;
        const updateData = req.body;
        const updatedReport = await Report.findByIdAndUpdate(reportId, updateData, { new: true });
        if (!updatedReport) {
            throw createError.NotFound("This report ID does not exist!");
        }
        res.status(200).json({
            message: "The report has been updated successfully!",
            updatedReport: updatedReport,
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update report",
            error: error.message,
        });
    }
}

module.exports = {
    generateReport,
    viewReport,
    deleteReport,
    updateReport
};
