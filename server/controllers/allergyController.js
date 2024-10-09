const Allergy = require('../models/allergyModel');

// Ajouter une allergie à un tuteur
const addAllergy = async (req, res) => {
  const { name, description, severity } = req.body;
  const tuteurId = req.params.tuteurId;

  try {
    const allergy = new Allergy({ name, description, severity, tuteur: tuteurId });
    await allergy.save();
    res.status(201).json({ message: 'Allergie ajoutée avec succès', allergy });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout de l\'allergie', error });
  }
};

// Récupérer les allergies d'un tuteur
const getAllergies = async (req, res) => {
  try {
    const allergies = await Allergy.find({ tuteur: req.params.tuteurId });
    res.status(200).json(allergies);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des allergies', error });
  }
};

module.exports = { addAllergy, getAllergies };
