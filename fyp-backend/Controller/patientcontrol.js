const Patient = require("../Model/patientmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createPatient(req, res) {
  try {
      const { name, city, PatientID, gender, phoneNo, patientHistory, radiologist } = req.body;
      console.log("body", req.body);

      // Validation checks
      // if (!name || !/^[A-Za-z]+$/.test(name)) {
      //     return res.status(400).send("Name should only contain alphabetic characters and is a required field");
      // }

      // if (!city || !/^[A-Za-z]+$/.test(city)) {
      //     return res.status(400).send("City should only contain alphabetic characters and is a required field");
      // }

      if (!PatientID || !/^\d+$/.test(PatientID)) {
          return res.status(400).send("Patient ID should be a string containing numbers only and is a required field");
      }

      const phoneNoRegex = /^(\+92|0)?[0-9]{10}$/; // Assuming the Pakistani phone number format is +92XXXXXXXXXX or 0XXXXXXXXXX
      if (!phoneNo || !phoneNoRegex.test(phoneNo)) {
          return res.status(400).send("PhoneNo should be a valid Pakistani number");
      }

      if (!gender || !['female', 'male', 'other'].includes(gender.toLowerCase())) {
          return res.status(400).send("Gender must be selected from female, male, or other and is a required field");
      }

      // Check if patient already exists
      const patientExists = await Patient.findOne({ PatientID });

      if (!patientExists) {
          const patient = await Patient.create({
              name,
              city,
              PatientID,
              gender,
              phoneNo,
              patientHistory,
              radiologist
          });
          console.log("Patient created");
          res.status(201).send("Patient created");
      } else {
          res.status(400).send("Patient with this ID already exists");
      }
  } catch (error) {
      console.log(error);
      res.status(500).send("Error creating patient");
  }
}
    async function getAllPatients(req, res) {
        try {
          const patients = await Patient.find({});
          if (!patients) {
            res.send("Invalid details");
          } else {
            res.send({
              ok: true,
              message: "successfully fetched all patients for this radiologist",
              data: { patients },
            });
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      }

      async function getPatientById(req, res) {
        try {
          const patient_id = req.params.id;
          const patient = await Patient.findById(patient_id);
          if (!patient) {
            res.send("Invalid patient id");
          } else {
            console.log("Success")
            res.send({
              ok: true,
              message: `successfully fetched the patient of id ${patient_id}`,
              data: { patient },
            });
          }
        } catch (error) {
          console.log(error);
          throw error;
        }
      }
      
    module.exports = {
      createPatient,
      getAllPatients,
      getPatientById
    };
    