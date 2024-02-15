const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

const authorize = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const secretKey = process.env.SECRET_KEY;
    const data = jwt.verify(token, secretKey);
    if (!data) {
      return res.send("Token has Expired");
    }
    console.log("AuthBody", data.user);
    // req.body = data.body;

    return next();
  } catch (error) {
    console.log(error);
  }
};

async function resetAccessToken(req, res) {
  try {
    // console.log(req.cookies);
    const { refreshToken} = req.cookies;
    // console.log(refreshToken);

    if (!refreshToken) {
      res.send("Invalid Refresh token or Token expired");
    }
    const verifyToken = await jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    if (!verifyToken) {
      res.send("Token donot match");
    }

    // const data = verifyToken.user[0]; 
    const email = verifyToken.user[0].email; 
    console.log(email);  

    const user = await User.find({ email });
    console.log(user)

    if (user) {
      const accessToken = await jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "1hr",
      });
      const refToken = await jwt.sign(
        { user },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "30days",
        }
      );

      res
      .cookie("access_token", accessToken, {
        httpOnly: true,
      }).cookie("refreshToken", refToken, {
        httpOnly:true
      })
      .status(200)
        .send("Access token updated succesfully");
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  authorize,
  resetAccessToken,
};
