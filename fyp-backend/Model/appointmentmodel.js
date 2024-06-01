const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    radiologist_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Radiologists'
    },
    patient_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Patients'
    },
    xray_id: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Xrays'
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    }
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
