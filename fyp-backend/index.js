const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const radiologistRouter = require('./Route/radiologistroute');
const patientRouter=require('./Route/patientroute');
const port = 3000;
const url = "mongodb+srv://aizakhank10000:dingdong123@cluster0.qhx8m7o.mongodb.net/?retryWrites=true&w=majority"

const cookieParser = require('cookie-parser');
const cors = require('cors');
// Connect to your Atlas cluster
// const client = new MongoClient(url);

require('dotenv').config()
// console.log(process.env)

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

mongoose.connect(url)
  .then(() => console.log('Connected!'));
  
app.use("/radiologist", radiologistRouter);
app.use("/patient",patientRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App is listeining on ${port}`);
});

app.use(bodyParser.json());