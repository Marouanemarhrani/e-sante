const express = require('express');
const { requireSignIn, checkRoleAndSubscription } = require('../middlewares/authMiddleware');
const {
  addDisease,
  getDiseases
} = require('../controllers/diseaseController');

const router = express.Router();

// Routes pour gérer les maladies
router.post('/:tuteurId/add', requireSignIn, checkRoleAndSubscription, addDisease);  // Ajouter une maladie à un tuteur
router.get('/:tuteurId', requireSignIn, checkRoleAndSubscription, getDiseases);  // Récupérer les maladies d'un tuteur

module.exports = router;
