const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const Patient = require("../Model/patientmodel");
const Radiologist = require("../Model/radiologistmodel");
// const RoleAuthorization = (requiredRoleId) => async (req, res, next) => {
//   try {
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       throw createError.Unauthorized();
//     }

//     const token = authHeader.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);

//     const user = await User.findById(decodedToken.userId);
//     if (!user) {
//       throw createError.Unauthorized();
//     }

//     if (user.role_id !== requiredRoleId) {
//       throw createError.Forbidden();
//     }

//     req.user = user;
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

// const VerifyJwtToken = () => async (req, res, next) => {
//   try {
//     console.log("Hello!")
//     const authHeader = req.headers['authorization'];
//     if (!authHeader) {
//       throw createError.Unauthorized();
//     }
//     const token = authHeader.split(' ')[1];
//     const decodedToken = jwt.verify(token, process.env.JWT_KEY);
//     console.log(decodedToken.userId)
//     const guardian = await Guardian.findByPk(decodedToken.userId);
//     if (!guardian) {
//       throw createError.Unauthorized();
//     }
//     req.guardian = guardian;
//     //console.log("Hello: ",req.guardian);
//     next();
//   } catch (err) {
//     return res.status(400).send(err.message)
//   }
// };

// module.exports = {
//   VerifyJwtToken};


const VerifyJwtToken = () => async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw createError.Unauthorized();
    }
    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    console.log(decodedToken.userId);
    let user;

      user = await Radiologist.findById(decodedToken.userId);
    if (!user) {
      throw createError.Unauthorized();
    }
    next();
  } catch (err) {
    return res.status(400).send(err.message);
  }
};
module.exports = {
  VerifyJwtToken};