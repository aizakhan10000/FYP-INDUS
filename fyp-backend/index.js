const express = require('express');
const { MongoClient } = require("mongodb");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const radiologistRouter = require('./Radiologist/route');
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
  
// app.use("/radiologist", customerRouter);

// app.listen(port, ()=> {
//     console.log("app is working on " ,port)
// })

// mongodb+srv://shassan22750:VllKbYAbC7La3Rqz@cluster0.9vyc4m5.mongodb.net/?retryWrites=true&w=majority

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`App is listeining on ${port}`);
});

app.use(bodyParser.json());