const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    city: {
      type: String,
      require: true,
    },
    // PatientID: {
    //   type: String,
    //   require: true,
    //   unique: true,
    // },
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
        type: Number,
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