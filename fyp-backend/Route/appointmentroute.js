const express = require("express");
const router = express.Router();
//const radiologistController = require('..Controller/radiologistcontrol');
const appointmentController = require('../Controller/appointmentcontrol');

router.post('/createAppointment/:patientId/:radiologistId/:xrayId', appointmentController.createAppointment);
router.get('/getAllAppointments', appointmentController.getAllAppointments);
module.exports = router;