const express = require('express');
const { requireSignIn, checkRoleAndSubscription } = require('../middlewares/authMiddleware');
const {
  addTreatment,
  getTreatments
} = require('../controllers/treatmentController');

const router = express.Router();

// Routes pour gérer les traitements
router.post('/:tuteurId/add', requireSignIn, checkRoleAndSubscription, addTreatment);  // Ajouter un traitement à un tuteur
router.get('/:tuteurId', requireSignIn, checkRoleAndSubscription, getTreatments);  // Récupérer les traitements d'un tuteur

module.exports = router;
