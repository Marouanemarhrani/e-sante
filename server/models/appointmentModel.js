const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  tuteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tuteur',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
