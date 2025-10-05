const express = require('express');
const router = express.Router();
const { publicHello, protectedHello, adminHello } = require('../controllers/exampleController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Public endpoint
router.get('/public', publicHello);

// Protected endpoint (any authenticated user)
router.get('/protected', verifyToken, protectedHello);

// Admin-only endpoint
router.get('/admin', verifyToken, checkRole('admin'), adminHello);

module.exports = router;
