const express = require('express');
const { requireSignIn, checkRoleAndSubscription } = require('../middlewares/authMiddleware');
const {
  addAppointment,
  getAppointments
} = require('../controllers/appointmentController');

const router = express.Router();

// Routes pour gérer les rendez-vous
router.post('/:tuteurId/add', requireSignIn, checkRoleAndSubscription, addAppointment);  // Ajouter un rendez-vous pour un tuteur
router.get('/:tuteurId', requireSignIn, checkRoleAndSubscription, getAppointments);  // Récupérer les rendez-vous d'un tuteur

module.exports = router;
