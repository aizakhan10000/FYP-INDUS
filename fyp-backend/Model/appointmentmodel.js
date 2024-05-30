const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const appointmentSchema = new mongoose.Schema(
  {
    
    phoneNo: {
      type: String,
      require: true,
    },
    patientname: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    radiologistname:{
      type:String,
      require:true,
    },
    date:{
        type:Date,
        require: true,
    },
    patient: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "patient",
        default: [],
      },
    ],
    radiologist: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "radiologist",
        default: [],
      },
    ],
  }
);

/*patientSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
*/
const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;