const express = require('express');
const router = express.Router();
const {
    createRating,
    getLecturerRatings,
    getCourseRatings,
    getAllRatings,
    getRatingStats
} = require('../controllers/ratingController');
const { verifyToken, checkRole } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

// Get all ratings (Admin only)
router.get('/', checkRole('admin'), getAllRatings);

// Get rating statistics (Admin only)
router.get('/stats', checkRole('admin'), getRatingStats);

// Get ratings for a specific lecturer
router.get('/lecturer/:lecturer_id', checkRole('lecturer','pl','prl','admin'), getLecturerRatings);

// Get ratings for a specific course
router.get('/course/:course_id', checkRole('lecturer','pl','prl','admin'), getCourseRatings);

// Create rating (Students or Admin)
router.post('/', checkRole('student','admin'), createRating);

module.exports = router;
