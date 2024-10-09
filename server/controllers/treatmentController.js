const Treatment = require('../models/treatmentModel');

// Ajouter un traitement à un tuteur
const addTreatment = async (req, res) => {
  const { medication, dosage, startDate, endDate, status } = req.body;
  const tuteurId = req.params.tuteurId;

  try {
    const treatment = new Treatment({ medication, dosage, startDate, endDate, status, tuteur: tuteurId });
    await treatment.save();
    res.status(201).json({ message: 'Traitement ajouté avec succès', treatment });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du traitement', error });
  }
};

// Récupérer les traitements d'un tuteur
const getTreatments = async (req, res) => {
  try {
    const treatments = await Treatment.find({ tuteur: req.params.tuteurId });
    res.status(200).json(treatments);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des traitements', error });
  }
};

module.exports = { addTreatment, getTreatments };
