const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const radiologistRouter = require('./Route/radiologistroute');
const patientRouter=require('./Route/patientroute');
const xRayRouter = require("./Route/xRayRoute")
const reportRouter = require("./Route/reportRoute")
const appointmentRouter=require("./Route/appointmentroute")
require('dotenv').config()

const port = 3000;
const url = process.env.DB_URI

const cookieParser = require('cookie-parser');
const cors = require('cors');
// Connect to your Atlas cluster
// const client = new MongoClient(url);

// console.log(process.env)

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(url)
  .then(() => console.log('MongoDB Atlas is connected!'));
  
app.use("/radiologist", radiologistRouter);
app.use("/patient",patientRouter);
app.use("/xray",xRayRouter);
app.use("/report",reportRouter);
app.use("/appointment",appointmentRouter);


app.use((req,res,next)=>{
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, DELETE"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

app.use(bodyParser.json());