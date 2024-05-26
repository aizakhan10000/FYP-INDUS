const express = require("express");
const router = express.Router();
const { verifyToken } = require("../auth/JWT_Tokens");
//const radiologistController = require('..Controller/radiologistcontrol');
const patientController = require('../Controller/patientcontrol');
//const {verifyAccessToken} = require("../auth/JWT_Tokens");
// const {verifyJwtToken} = require("../auth/tokenVerification")
// router.post('/createPatient', verifyAccessToken, patientController.createPatient);
router.post('/createPatient', verifyToken, patientController.createPatient);
// router.get('/getAllPatients', verifyAccessToken, patientController.getAllPatients);
router.get('/getAllPatients',patientController.getAllPatients);
router.get('/getPatientById/:id', patientController.getPatientById);


module.exports = router;