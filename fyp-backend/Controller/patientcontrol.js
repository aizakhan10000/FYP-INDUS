const Patient = require("../Model/patientmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createPatient(req,res) {
    try {
        const{ name, city, PatientID, gender, phoneNo, patientHistory, radiologist }=req.body;
        console.log("body",req.body);
  
        const patientExists=await Patient.findOne({PatientID})
  
        if(!patientExists){
            const patient=await Patient.create([
                {
                   name, 
                   city, 
                   PatientID, 
                   gender,  
                   phoneNo, 
                   patientHistory, 
                   radiologist
                },
            ]);
            console.log("Patient created")  
            res.send("Patient created")        
        }
        else{
            res.send("invalid data")
        }
    }
    catch (error) {
        console.log(error);
        throw error;
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
    