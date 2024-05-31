const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const appointmentSchema = new mongoose.Schema(
  {
    radiologist_id : {      // x ray picture
      type: Number,
      required: true,
      ref : 'Radiologists'
  },
    patient_id: {
      type: Number,
      require: true,
      ref: 'Patients'
    },
    xray_id:{
      type: Number,
      require: true,
      ref: 'Xrays'
    },
    date:{
        type:Date,
        require: true,
    },
    time:{
      type: String,

    },
    completed:{
      type: Boolean,
      require: true
    }
  }
);

/*patientSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});
*/
const Appointment = mongoose.model("appointment", appointmentSchema);

module.exports = Appointment;