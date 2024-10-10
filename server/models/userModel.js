const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Senior', 'Tuteur'],
    required: true
  },
  tuteurs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tuteur'
  }],
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
