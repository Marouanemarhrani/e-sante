const Subscription = require('../models/subscriptionModel');

// Création d'une souscription
const createSubscription = async (req, res) => {
  const { plan, paymentMethod, amount } = req.body;
  const userId = req.user._id;

  try {
    const subscription = new Subscription({
      user: userId,
      plan,
      status: 'active',
      renewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      paymentMethod,
      amount
    });

    await subscription.save();
    res.status(201).json({ message: 'Souscription créée avec succès', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de la souscription', error });
  }
};

// Mise à jour d'une souscription
const updateSubscription = async (req, res) => {
  const { plan, paymentMethod, amount } = req.body;

  try {
    const subscription = await Subscription.findOneAndUpdate(
      { user: req.user._id },
      { plan, paymentMethod, amount, renewalDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)) },
      { new: true }
    );
    res.status(200).json({ message: 'Souscription mise à jour avec succès', subscription });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la souscription', error });
  }
};

// Récupérer les détails d'une souscription
const getSubscription = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user._id });
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la souscription', error });
  }
};

module.exports = { createSubscription, updateSubscription, getSubscription };
