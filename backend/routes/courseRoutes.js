const express = require('express');
const router = express.Router();
const {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    assignLecturer,
    getLecturerCourses,
    getAllLecturers
} = require('../controllers/courseController');
const { verifyToken, checkRole } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);

// Get all courses (accessible by all authenticated users)
router.get('/', getAllCourses);

// Lecturer-specific endpoints (define before parameterized routes)
router.get('/lecturer/my-courses', checkRole('lecturer'), getLecturerCourses);
router.get('/lecturer/:lecturer_id/courses', checkRole('pl', 'prl', 'admin'), getLecturerCourses);

// Get all lecturers (for course assignment) – PL, PRL, Admin only
router.get('/lecturers/all', checkRole('pl', 'prl', 'admin'), getAllLecturers);

// Get course by ID
router.get('/:id', getCourseById);

// Create course (PL and Admin only)
router.post('/', checkRole('pl', 'admin'), createCourse);

// Update course (PL and Admin only)
router.put('/:id', checkRole('pl', 'admin'), updateCourse);

// Delete course (PL and Admin only)
router.delete('/:id', checkRole('pl', 'admin'), deleteCourse);

// Assign lecturer to course (PL and Admin only)
router.post('/assign-lecturer', checkRole('pl', 'admin'), assignLecturer);

module.exports = router;
