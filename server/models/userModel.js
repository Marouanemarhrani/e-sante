const express = require('express');
const { requireSignIn } = require('../middlewares/authMiddleware');
const {
  registerSenior,
  loginUser,
  createTuteur,
  updateUserProfile,
  getTuteurById,
  updateMood // New controller function
} = require('../controllers/userController');

const router = express.Router();

// Routes for Senior and Tuteur
router.post('/register-senior', registerSenior);  // Register a Senior
router.post('/login', loginUser);  // Login for Senior and Tuteur
router.post('/tuteur/create', requireSignIn, createTuteur);  // Create a Tuteur (by Senior)
router.put('/profile/update', requireSignIn, updateUserProfile);  // Update profile (Senior or Tuteur)
router.get('/tuteur/:id', requireSignIn, getTuteurById);  // Get Tuteur information

// New route for updating mood
router.put('/mood/update', requireSignIn, updateMood);  // Update mood

module.exports = router;
