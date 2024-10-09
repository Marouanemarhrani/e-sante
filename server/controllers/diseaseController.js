const Disease = require('../models/diseaseModel');

// Ajouter une maladie à un tuteur
const addDisease = async (req, res) => {
  const { name, description, dateDebut, dateFin } = req.body;
  const tuteurId = req.params.tuteurId;

  try {
    const disease = new Disease({ name, description, dateDebut, dateFin, tuteur: tuteurId });
    await disease.save();
    res.status(201).json({ message: 'Maladie ajoutée avec succès', disease });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la maladie', error });
  }
};

// Récupérer les maladies d'un tuteur
const getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find({ tuteur: req.params.tuteurId });
    res.status(200).json(diseases);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des maladies', error });
  }
};

module.exports = { addDisease, getDiseases };
