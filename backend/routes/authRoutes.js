const express = require('express');
const router = express.Router();
const { register, login, getProfile } = require('../controllers/authController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/profile', verifyToken, getProfile);

// Example admin-only route
router.get('/admin', verifyToken, checkRole('admin'), (req, res) => {
    res.json({ success: true, message: 'Welcome, admin!' });
});

module.exports = router;
