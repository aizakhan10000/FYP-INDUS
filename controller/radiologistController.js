const Radiologist = require("../models/radiologistModel");
const createError = require("http-errors");
const { AccessToken, RefreshToken } = require("../helpers/JWT_Tokens");

async function signup(req, res) {
    try {
      const {
        email,
        // hospitalID,
        // username, 
        password,
      } = req.body;
      console.log("body", req.body);
  
      const radiologistExists = await Radiologist.findOne({ email });
  
      if (!radiologistExists) {
        const radiologist = await Radiologist.create({
          email,
          // hospitalID,
          // username,
          password,
          patients: [],
        });
  
        res.status(200).send({
          message: "Radiologist signup successfully",
          data: radiologist, // Sending back the created customer data
        });
      } else {
        res.status(400).send({
          message: "Radiologist already exists",
        });
      }
    } catch (error) {
      console.error(error); // Using console.error for better error visibility
      res.status(500).send({
        message: "An error occurred during the signup process.",
        error: error.message, // Providing the error message for debugging
      });
    }
  }

  async function login(req, res) {
    try {
      const { email, password } = req.body;
      console.log(req.body);
      let radiologist;
  
      if (!username || !password) {
        res.status(401).send({
          message: "Invalid email or password",
        });
      } else {
        radiologist = await Radiologist.findOne({ email });
        console.log("Radiologist fetched");
        if (!radiologist || !(await bcrypt.compare(password, radiologist.password))) {
          res.status(401).send({
            message: "Invalid email or password",
          });
        } else {
          const accessToken = await AccessToken(radiologist.id);
            res.status(200).send({
              message: "Radiologist login successfully",
              data: {radiologist,accessToken}
            });
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function resetPassword(req, res) {
    try {
      const { email, newPassword, confirmPassword } = req.body;
  
      const radiologist = await Radiologist.findOne({ email });
  
      if (newPassword != confirmPassword) {
        res.status(400).send({
          message: "passwords do not match",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(newPassword, salt);
  
        const updatedRadiologist = await Customer.updateOne({
          password: hash,
        });
  
        res.status(200).send({
          message: "Password updated successfully",
          data: updatedRadiologist,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async function forgetPassword(req, res) {
    try {
      const { email } = req.body;
  
      const radiologist = await Radiologist.findOne({ email });
      console.log(radiologist);
  
      if (!radiologist) throw createError.NotFound("Radiologist not registered!");
    res.status(200).send({
            message: "Radiologist found successfully!",
          });

  }
  catch(error){
    res.status(400).send({
      message: "Radiologist not found!",
    });
  }
}

  module.exports = {
    signup,
    login,
    forgetPassword,
    resetPassword,
  }