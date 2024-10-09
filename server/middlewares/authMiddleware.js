const JWT = require('jsonwebtoken');
const Subscription = require('../models/subscriptionModel');
const User = require('../models/userModel');

// Middleware pour vérifier l'authentification de l'utilisateur via JWT
const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Non autorisé, aucun token' });
    }

    // Vérification et décodage du token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode; // Ajoute l'utilisateur au req
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

// Middleware pour vérifier le rôle (Senior ou Tuteur) et la souscription active
const checkRoleAndSubscription = async (req, res, next) => {
  try {
    // Récupération de l'utilisateur à partir de l'ID du token décodé
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérification du rôle (Senior ou Tuteur)
    if (user.role !== 'Senior' && user.role !== 'Tuteur') {
      return res.status(403).json({ message: 'Accès interdit, rôle non valide' });
    }

    // Si l'utilisateur est un tuteur, vérifier son Senior responsable
    if (user.role === 'Tuteur') {
      const senior = await User.findById(user.senior);
      if (!senior || senior.role !== 'Senior') {
        return res.status(403).json({ message: 'Le senior responsable n\'est pas valide ou inexistant' });
      }
    }

    // Vérification de la souscription active
    const subscription = await Subscription.findOne({ user: user._id });

    if (!subscription || subscription.status !== 'active') {
      return res.status(403).json({ message: 'Aucune souscription active trouvée' });
    }

    // Vérifie si le plan permet l'accès à la fonctionnalité
    if (subscription.plan === 'free') {
      return res.status(403).json({ message: 'Améliorez votre plan pour accéder à cette fonctionnalité' });
    }

    // Si tout est correct, on continue
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la vérification du rôle ou de la souscription', error });
  }
};

module.exports = { requireSignIn, checkRoleAndSubscription };
