const Radiologist = require("../Model/radiologistmodel");
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const { AccessToken } = require("../auth/JWT_Tokens");


async function signup(req, res) {
    try {
      const {
        name,
        hospitalID,
        username, 
        password,
        
      } = req.body;
      console.log("body", req.body);
  
      const radiologistExists = await Radiologist.findOne({ username });
  
      if (!radiologistExists) {
        const radiologist = await Radiologist.create({
          name,
          hospitalID,
          username,
          password,
          
        });
        const accessToken = await AccessToken(radiologist.id);

        res.status(200).send({
          message: "Radiologist signup successfully",
          data: radiologist, // Sending back the created radiologist data
          accessToken : accessToken
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

// TO BE EDITED

  async function login(req, res) {
    try {
      const { username, password } = req.body;
      console.log(req.body);
      let radiologist;
  
      if (!username || !password) {
        res.status(401).send({
          message: "Invalid username or password",
        });
      } else {
        radiologist = await Radiologist.findOne({ username });
        console.log("Radiologist fetched");
        if (!radiologist || !bcrypt.compare(password, radiologist.password)) {
          res.status(401).send({
            message: "Invalid username or password",
          });
        } else {
          // const secretKey = process.env.SECRET_KEY;
  
          // const token = jwt.sign({ radiologist }, secretKey, {
          //   expiresIn: "1hr",
          // });
          // console.log(token);
  
          // const refToken = jwt.sign(
          //   { radiologist },
          //   process.env.REFRESH_TOKEN_SECRET,
          //   {
          //     expiresIn: "8hr",
          //   }
          // );
          // console.log(token);
  
          // res
          //   .cookie("access_token", token, {
          //     httpOnly: true,
          //   })
          //   .cookie("refreshToken", refToken, {
          //     httpOnly: true,
          //   })
          const accessToken = await AccessToken(radiologist.id);

            res.status(200)
            .send({
              message: "Radiologist login successfully",
              data: radiologist,
              accessToken : accessToken
            });
        }
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
/*
  async function resetPassword(req, res) {
    try {
      const { username, password, newPassword, confirmPassword } = req.body;
  
      const customer = await Customer.findOne({ username });
      console.log(customer.password);
      console.log(password);
  
      if (!(await bcrypt.compare(password, customer.password))) {
        res.status(401).send({
          message: "incorrect password",
        });
      } else if (newPassword != confirmPassword) {
        res.status(400).send({
          message: "password does not match",
        });
      } else {
        console.log(newPassword);
        const hashPassword = bcrypt.hashSync(newPassword, 10);
  
        const updatedCustomer = await Customer.updateOne({
          password: hashPassword,
        });
  
        res.status(200).send({
          message: "Password updated successfully",
          data: updatedCustomer,
        });
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }


  async function forgetPassword(req, res) {
    try {
      const { username, newPassword, confirmPassword } = req.body;
  
      const customer = await Customer.findOne({ username });
      console.log(customer);
  
      if (customer) {
        if (newPassword === confirmPassword) {
          const hashPassword = bcrypt.hashSync(newPassword, 10);
  
          const updateCustomerPassword = await Customer.updateOne({
            password: hashPassword,
          });
  
          res.status(200).send({
            message: "Password updated successfully",
            data: updateCustomerPassword,
          });
        } else {
          res.status(400).send({
            message: "Passwords donot match",
          });
        }
      } else {
        res.status(400).send({
          message: "Customer not found or password donot match",
        });
      }
    } catch (error) {}
  }
  */

  module.exports = {
    signup,
    login,
    //forgetPassword,
    //resetPassword,
  }