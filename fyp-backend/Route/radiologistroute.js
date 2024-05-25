const express = require("express");
const { verifyToken } = require("../auth/JWT_Tokens");

const radiologistController = require('../Controller/radiologistcontrol');

const router = express.Router();


router.post('/signup', radiologistController.signup);
router.post('/login', verifyToken, radiologistController.login);
//router.post('/reset-password', radiologistController.resetPassword);
//router.post('/forgot-password', radiologistController.forgetPassword);

module.exports = router;