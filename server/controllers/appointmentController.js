const Appointment = require('../models/appointmentModel');

// Ajouter un rendez-vous pour un tuteur
const addAppointment = async (req, res) => {
  const { date, doctor, location } = req.body;
  const tuteurId = req.params.tuteurId;

  try {
    const appointment = new Appointment({ date, doctor, location, tuteur: tuteurId });
    await appointment.save();
    res.status(201).json({ message: 'Rendez-vous ajouté avec succès', appointment });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du rendez-vous', error });
  }
};

// Récupérer les rendez-vous d'un tuteur
const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ tuteur: req.params.tuteurId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des rendez-vous', error });
  }
};

module.exports = { addAppointment, getAppointments };
