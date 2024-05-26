const Radiologist = require("../Model/radiologistmodel");
const bcrypt = require('bcrypt');
const { AccessToken, RefreshToken } = require("../auth/JWT_Tokens");

async function signup(req, res) {
  try {
      const { name, hospitalID, username, password } = req.body;
      console.log("body", req.body);

      // Validation checks
      if (!name || !/^[A-Za-z]+$/.test(name)) {
          return res.status(400).send("Name should only contain alphabetic characters and is a required field");
      }

      if (!username || typeof username !== 'string') {
          return res.status(400).send("Username must be a string and is a required field");
      }

      if (!hospitalID || !/^\d+$/.test(hospitalID)) {
          return res.status(400).send("Hospital ID should only contain numbers and is a required field");
      }

      // Check if the username is unique
      const radiologistExists = await Radiologist.findOne({ username });
      if (radiologistExists) {
          return res.status(400).send("Radiologist already exists");
      }

      // Check if the hospital ID is unique
      const hospitalIDExists = await Radiologist.findOne({ hospitalID });
      if (hospitalIDExists) {
          return res.status(400).send("Hospital ID already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the radiologist
      const radiologist = await Radiologist.create({
          name,
          hospitalID,
          username,
          password: hashedPassword,
      });

      // Generate tokens
      const accessToken = AccessToken(radiologist.id);
      const refreshToken = RefreshToken(radiologist.id);

      // Set cookies
      res.cookie("access_token", accessToken, {
          httpOnly: true,
      })
      .cookie("refreshToken", refreshToken, {
          httpOnly: true,
      });

      res.status(200).send({
          message: "Radiologist signup successfully",
          data: radiologist,
          accessToken,
      });

  } catch (error) {
      console.error(error);
      res.status(500).send({
          message: "An error occurred during the signup process.",
          error: error.message,
      });
  }
}
async function login(req, res) {
    try {
        const { username, password } = req.body;
        console.log(req.body);

        if (!username || !password) {
            return res.status(401).send({
                message: "Invalid username or password",
            });
        }

        const radiologist = await Radiologist.findOne({ username });
        console.log("Radiologist fetched");

        if (!radiologist || !bcrypt.compare(password, radiologist.password)) {
            return res.status(401).send({
                message: "Invalid username or password",
            });
        }

        const accessToken = AccessToken(radiologist.id);
        const refreshToken = RefreshToken(radiologist.id);

        res.cookie("access_token", accessToken, {
            httpOnly: true,
        })
        .cookie("refreshToken", refreshToken, {
            httpOnly: true,
        });

        res.status(200).send({
            message: "Radiologist login successfully",
            data: radiologist,
            accessToken,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            message: "An error occurred during the login process.",
            error: error.message,
        });
    }
}

module.exports = {
    signup,
    login,
};
