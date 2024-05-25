const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

function AccessToken(radiologistId) {
    return jwt.sign({ id: radiologistId }, secretKey, { expiresIn: '24h' });
}

function RefreshToken(radiologistId) {
    return jwt.sign({ id: radiologistId }, refreshTokenSecret, { expiresIn: '8h' });
}

//function verifyToken(token) {
   // return jwt.verify(token, secretKey);
//}


function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token format is incorrect' });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token is not valid' });
        }
        req.user = user;
        next();
    });
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
