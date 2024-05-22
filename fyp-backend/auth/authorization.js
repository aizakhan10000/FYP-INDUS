const { verifyToken } = require('./JWT_Tokens');

function authenticateToken(req, res, next) {
    const token = req.cookies.access_token || req.headers['authorization'];

    if (!token) {
        return res.status(401).send({ message: 'Access Denied. No token provided.' });
    }

    try {
        const verified = verifyToken(token);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send({ message: 'Invalid Token' });
    }
}

module.exports = {
    authenticateToken,
};
