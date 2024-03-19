const express = require("express");
const router = express.Router();
//const radiologistController = require('..Controller/radiologistcontrol');
const patientController = require('../Controller/patientcontrol');
const {verifyAccessToken} = require("../auth/JWT_Tokens");
const {verifyJwtToken} = require("../auth/tokenVerification")
router.post('/createPatient', verifyAccessToken, patientController.createPatient);
router.get('/getAllPatients/:id', verifyAccessToken, patientController.getAllPatients);
module.exports = router;