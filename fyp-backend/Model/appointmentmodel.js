const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const appointmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    PatientID: {
      type: String,
      require: true,
      unique: true,
    },
    phoneNo: {
      type: String,
      require: true,
    },
    attended: {
      type: Boolean,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
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