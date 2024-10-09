const mongoose = require('mongoose');

const tuteurSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  senior: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Référence au senior responsable
    required: true
  },
  maladies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Disease'
  }],
  traitements: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Treatment'
  }],
  allergies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Allergy'
  }],
  rendezVous: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment'
  }]
}, { timestamps: true });

const Tuteur = mongoose.model('Tuteur', tuteurSchema);
module.exports = Tuteur;
