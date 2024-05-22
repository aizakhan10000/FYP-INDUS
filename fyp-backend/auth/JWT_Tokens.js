const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

function AccessToken(radiologistId) {
    return jwt.sign({ id: radiologistId }, secretKey, { expiresIn: '1h' });
}

function RefreshToken(radiologistId) {
    return jwt.sign({ id: radiologistId }, refreshTokenSecret, { expiresIn: '8h' });
}

function verifyToken(token) {
    return jwt.verify(token, secretKey);
}

function verifyRefreshToken(token) {
    return jwt.verify(token, refreshTokenSecret);
}

module.exports = {
    AccessToken,
    RefreshToken,
    verifyToken,
    verifyRefreshToken,
};
