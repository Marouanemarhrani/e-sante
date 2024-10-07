const express = require('express');
const { 
    registerController, 
    loginController, 
    updateProfileController, 
    deleteUserController
} = require('../controllers/userController');
const { isAdmin, requireSignIn } = require('../middlewares/authMiddleware');

const router = express.Router();

// Routing
// Register a new user
router.post('/register', registerController);

// User login
router.post('/login', loginController);

// Update user profile
router.put('/profile', requireSignIn, updateProfileController);

// Protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
});

// Protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//delete account
router.delete('/delete-account', requireSignIn, deleteUserController);

module.exports = router;