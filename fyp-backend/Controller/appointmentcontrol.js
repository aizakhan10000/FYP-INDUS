const Appointment = require("../Model/appointmentmodel");
const Patient = require('../Model/patientmodel'); // Adjust the path as necessary
const Radiologist = require('../Model/radiologistmodel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const XRay = require("../Model/xRayModel");

async function createAppointment(req, res) {
  try {
    // Extract patient ID and radiologist ID from the request parameters
    const patientId = req.params.patientId;
    const radiologistId = req.params.radiologistId;
    const xrayId = req.params.xrayId;

    // Fetch patient details using the provided patientId
    const patient = await Patient.findById(patientId);
    if (!patient) {
      console.log(`Patient not found with ID: ${patientId}`);
      return res.status(404).send("Patient not found");
    }

    // Fetch radiologist details using the provided radiologistId
    const radiologist = await Radiologist.findById(radiologistId);
    if (!radiologist) {
      console.log(`Radiologist not found with ID: ${radiologistId}`);
      return res.status(404).send("Radiologist not found");
    }

    // Fetch xray details using the provided xrayId
    const xray = await XRay.findById(xrayId);
    if (!xray) {
      console.log(`Xray not found with ID: ${xrayId}`);
      return res.status(404).send("Xray not found");
    }

    const { date, time } = req.body;
    console.log(`Appointment data: patientId=${patientId}, radiologistId=${radiologistId}, xrayId=${xrayId}, date=${date}, time=${time}`);

    const appointment = new Appointment({
      patient_id: patientId,
      radiologist_id: radiologistId,
      xray_id: xrayId,
      date: date,
      time: time, // Store the time as a string
      completed: false // Set default value for completed as false
    });

    // Save the appointment to the database
    await appointment.save();
    console.log("Appointment created");
    res.status(200).send({
      message: "Appointment created",
      appointment: appointment
    });
  } catch (error) {
    console.log("Error in creating appointment:", error);
    res.status(500).send("Error in creating appointment");
  }
}
    
    async function getAllAppointments(req, res) {
        try {
          const appointments = await Appointment.find({});
          if (!appointments) {
            res.send("Invalid details");
          } else {
            res.send({
              ok: true,
              message: "successfully fetched all appointments",
              data: { appointments },
            });
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

      async function getTotalAppointmentsCount(req, res) {
        try {
          const count = await Appointment.countDocuments();
          res.status(200).json({
            message: "Total number of appointments retrieved successfully",
            count: count
          });
        } catch (error) {
          res.status(500).json({
            error: error.message,
            count: 0
          });
        }
      }
      
      module.exports = {
        createAppointment,
        getAllAppointments,
        getTotalAppointmentsCount,
      };