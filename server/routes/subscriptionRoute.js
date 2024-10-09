const express = require('express');
const { requireSignIn } = require('../middlewares/authMiddleware');
const {
  createSubscription,
  updateSubscription,
  getSubscription
} = require('../controllers/subscriptionController');

const router = express.Router();

// Routes pour gérer les souscriptions
router.post('/create', requireSignIn, createSubscription);  // Créer une souscription
router.put('/update', requireSignIn, updateSubscription);  // Mettre à jour une souscription
router.get('/details', requireSignIn, getSubscription);  // Obtenir les détails d'une souscription

module.exports = router;
