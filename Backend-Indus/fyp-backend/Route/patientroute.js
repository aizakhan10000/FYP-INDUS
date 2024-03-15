const express = require("express");
const router = express.Router();
//const radiologistController = require('..Controller/radiologistcontrol');
const patientController = require('../Controller/patientcontrol');



router.post('/createPatient', patientController.createPatient);
router.get('/getAllPatients', patientController.getAllPatients);
module.exports = router;