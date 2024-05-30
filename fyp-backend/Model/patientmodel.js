const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    PatientID:{
      type:String,
      require: true,
    },
    /*cnic:{
      type: String,
      require:true,
      unique:true,
    },
    address:{
      type:String,
      require:true,
      
    },*/
    city: {
      type: String,
      require: true,
    },
    phoneNo: {
      type: String,
      require: true,
    },
    patientHistory: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    }, 
    radiologist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "radiologist",
        // default: [],
      },
    ],
  }
  
);

/*patientSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
*/
const Patient = mongoose.model("patient", patientSchema);

module.exports = Patient;