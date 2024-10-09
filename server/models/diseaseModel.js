const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  tuteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tuteur',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date
  }
}, { timestamps: true });

const Disease = mongoose.model('Disease', diseaseSchema);
module.exports = Disease;
