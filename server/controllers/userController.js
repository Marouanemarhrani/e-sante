const User = require('../models/userModel');
const { hashPassword, comparePassword } = require('../helpers/authHelper');
const JWT = require('jsonwebtoken');

// Enregistrement d'un Senior
const registerSenior = async (req, res) => {
    const { username, email, password, phone, address } = req.body;
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Cet email est déjà enregistré.' });
      }
  
      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      // Create the user with phone and address fields
      const user = new User({
        username,
        email,
        password: hashedPassword,
        phone,   // Added phone
        address, // Added address
        role: 'Senior',
        subscription: {
          plan: 'free',
          status: 'inactive'
        }
      });
  
      // Save the user
      await user.save();
  
      // Return success response
      res.status(201).json({ success: true, message: 'Compte Senior enregistré avec succès.', user });
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur lors de l\'inscription.', error });
    }
  };
  

  const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Compare passwords
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
  
      // Generate JWT token
      const token = JWT.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      // Respond with success, token, and user details
      res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user,
      });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ success: false, message: 'Error logging in', error });
    }
  };
  
  

// Création d'un Tuteur par un Senior
const createTuteur = async (req, res) => {
  const { name, age, gender } = req.body;
  const seniorId = req.user._id;

  try {
    const tuteur = new User({
      username: name,
      age,
      gender,
      role: 'Tuteur',
      senior: seniorId
    });
    await tuteur.save();

    // Ajouter ce tuteur au senior
    await User.findByIdAndUpdate(seniorId, { $push: { tuteurs: tuteur._id } });
    
    res.status(201).json({ message: 'Tuteur créé avec succès', tuteur });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du tuteur', error });
  }
};

// Mise à jour du profil utilisateur (Senior ou Tuteur)
const updateUserProfile = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    const updates = { username, email };

    if (password) {
      updates.password = await hashPassword(password);
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    res.status(200).json({ message: 'Profil mis à jour avec succès', updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil', error });
  }
};

// Récupérer les informations d'un tuteur
const getTuteurById = async (req, res) => {
  try {
    const tuteur = await User.findById(req.params.id).populate('maladies traitements allergies rendezVous');
    if (!tuteur || tuteur.role !== 'Tuteur') {
      return res.status(404).json({ message: 'Tuteur non trouvé' });
    }
    res.status(200).json(tuteur);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération du tuteur', error });
  }
};

// Update Mood Controller
const updateUserMood = async (req, res) => {
  try {
    const { mood } = req.body;
    const userId = req.user._id; // Assuming the user ID is available in the request

    // Update the user's mood in the database
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      { mood }, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' });
    }

    return res.status(200).json({ success: true, message: 'Humeur mise à jour avec succès', updatedUser });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'humeur:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur lors de la mise à jour de l\'humeur' });
  }
};

module.exports = { updateUserMood };

  

module.exports = { registerSenior, loginUser, createTuteur, updateUserProfile, getTuteurById, updateMood };
