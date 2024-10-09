const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser');

// Import routes
const userRoute = require('./routes/userRoute');
const subscriptionRoute = require('./routes/subscriptionRoute');
const diseaseRoute = require('./routes/diseaseRoute');
const treatmentRoute = require('./routes/treatmentRoute');
const allergyRoute = require('./routes/allergyRoute');
const appointmentRoute = require('./routes/appointmentRoute');

// Configure environment variables
dotenv.config();

// Connect to the database
connectDB()
  .then(() => console.log('Database connected successfully'))
  .catch((err) => {
    console.error('Database connection failed', err);
    process.exit(1);  // Stop the application if the database connection fails
  });

// Create Express app
const app = express();

// Middleware setup
// Augmenter la taille limite de la requête pour gérer de grandes charges utiles
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Activer CORS pour les requêtes cross-origin
app.use(cors());

// Utiliser Morgan pour le logging des requêtes en mode développement
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Routes
app.use('/api/users', userRoute);  // Routes pour les utilisateurs
app.use('/api/subscriptions', subscriptionRoute);  // Routes pour les souscriptions
app.use('/api/diseases', diseaseRoute);  // Routes pour les maladies
app.use('/api/treatments', treatmentRoute);  // Routes pour les traitements
app.use('/api/allergies', allergyRoute);  // Routes pour les allergies
app.use('/api/appointments', appointmentRoute);  // Routes pour les rendez-vous

// Gestion des erreurs 404 pour les routes non définies
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Erreur interne du serveur',
    error: err.message,
  });
});

// Define port
const PORT = process.env.PORT || 8080;

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  });
}

module.exports = app;
