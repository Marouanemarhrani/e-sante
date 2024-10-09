const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
  tuteur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tuteur',
    required: true
  },
  medication: {
    type: String,
    required: true
  },
  dosage: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['en cours', 'terminé', 'à venir'],
    required: true
  }
}, { timestamps: true });

const Treatment = mongoose.model('Treatment', treatmentSchema);
module.exports = Treatment;
