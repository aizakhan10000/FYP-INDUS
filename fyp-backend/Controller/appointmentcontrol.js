const Appointment = require("../Model/appointmentmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createAppointment(req, res) {
    try {
        const { name, PatientID, gender, phoneNo, attended, radiologist, date } = req.body;
        console.log("body", req.body);

        // Directly create the appointment without checking if it already exists
        const appointment = await Appointment.create({
            name,
            PatientID,
            gender,
            phoneNo,
            date,
            attended,
            radiologist
        });

        console.log("Appointment created");
        res.status(201).send("Appointment created");
    } catch (error) {
        console.log(error);
        res.status(400).send("Error in creating appointment");
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
      
    module.exports = {
     
      createAppointment,
      getAllAppointments,
    };
    