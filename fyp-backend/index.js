require('dotenv').config();
const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
const axios = require("axios")
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const radiologistRouter = require('./Route/radiologistroute');
const patientRouter = require('./Route/patientroute');
const xRayRouter = require('./Route/xRayRoute');
const reportRouter = require('./Route/reportRoute');
const appointmentRouter = require('./Route/appointmentroute');
const cookieParser = require('cookie-parser');
var cors = require('cors');

const port = 3000;
const url = process.env.DB_URI;

mongoose.connect(url)
  .then(() => console.log('MongoDB Atlas is connected!'));

  // Middleware
app.use(cors()); // Enable All CORS Requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.options('*',cors());
// var allowCrossDomain = function(req,res,next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
//   res.header('Access-Control-Allow-Headers', 'Content-Type');
//   next();  
// }
// app.use(allowCrossDomain);

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, DELETE"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });

app.use("/radiologist", radiologistRouter);
app.use("/patient", patientRouter);
app.use("/xray", xRayRouter);
app.use("/report", reportRouter);
app.use("/appointment", appointmentRouter);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});