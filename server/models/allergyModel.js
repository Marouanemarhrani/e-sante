const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
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
  severity: {
    type: String,
    enum: ['légère', 'modérée', 'sévère'],
    required: true
  }
}, { timestamps: true });

const Allergy = mongoose.model('Allergy', allergySchema);
module.exports = Allergy;
