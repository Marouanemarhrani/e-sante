const express = require('express');
const { requireSignIn, checkRoleAndSubscription } = require('../middlewares/authMiddleware');
const {
  registerSenior,
  loginUser,
  createTuteur,
  updateUserProfile,
  getTuteurById
} = require('../controllers/userController');

const router = express.Router();

// Routes pour Senior et Tuteur
router.post('/register-senior', registerSenior);  // Enregistrer un Senior
router.post('/login', loginUser);  // Connexion pour Senior et Tuteur
router.post('/tuteur/create', requireSignIn, createTuteur);  // Créer un tuteur (par un senior)
router.put('/profile/update', requireSignIn, updateUserProfile);  // Mise à jour du profil (Senior ou Tuteur)
router.get('/tuteur/:id', requireSignIn, getTuteurById);  // Récupérer les informations d'un tuteur

module.exports = router;
