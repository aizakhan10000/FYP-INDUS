const Radiologist = require("../Model/radiologistmodel");
const bcrypt = require('bcrypt');
const { AccessToken, RefreshToken } = require("../auth/JWT_Tokens");

async function signup(req, res) {
    try {
        const { name, hospitalID, username, password } = req.body;
        console.log("body", req.body);

        const radiologistExists = await Radiologist.findOne({ username });

        if (!radiologistExists) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const radiologist = await Radiologist.create({
                name,
                hospitalID,
                username,
                password: hashedPassword,
            });
            const accessToken = AccessToken(radiologist.id);
            const refreshToken = RefreshToken(radiologist.id);

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
        } else {
            res.status(400).send({
                message: "Radiologist already exists",
            });
        }
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
