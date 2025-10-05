const { pool } = require('../config/database');

// Get all ratings (Admin only)
exports.getAllRatings = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT r.*, u.username AS student_name, l.username AS lecturer_name, c.name AS course_name
             FROM ratings r
             JOIN users u ON r.student_id = u.id
             JOIN users l ON r.lecturer_id = l.id
             JOIN courses c ON r.course_id = c.id`
        );
        res.json({ success: true, ratings: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get ratings for a specific lecturer
exports.getLecturerRatings = async (req, res) => {
    try {
        const lecturerId = req.params.lecturer_id || req.user.userId;
        const [rows] = await pool.execute(
            `SELECT r.*, u.username AS student_name, c.name AS course_name
             FROM ratings r
             JOIN users u ON r.student_id = u.id
             JOIN courses c ON r.course_id = c.id
             WHERE r.lecturer_id = ?`,
            [lecturerId]
        );
        res.json({ success: true, ratings: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get ratings for a specific course
exports.getCourseRatings = async (req, res) => {
    try {
        const courseId = req.params.course_id;
        const [rows] = await pool.execute(
            `SELECT r.*, u.username AS student_name, l.username AS lecturer_name
             FROM ratings r
             JOIN users u ON r.student_id = u.id
             JOIN users l ON r.lecturer_id = l.id
             WHERE r.course_id = ?`,
            [courseId]
        );
        res.json({ success: true, ratings: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create rating (Student or Admin)
exports.createRating = async (req, res) => {
    try {
        const { course_id, lecturer_id, rating, comments } = req.body;
        const studentId = req.user.role === 'student' ? req.user.userId : req.body.student_id;

        const [result] = await pool.execute(
            `INSERT INTO ratings (course_id, lecturer_id, student_id, rating, comments)
             VALUES (?, ?, ?, ?, ?)`,
            [course_id, lecturer_id, studentId, rating, comments]
        );

        res.status(201).json({ success: true, message: 'Rating created', ratingId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get rating statistics (Admin only)
exports.getRatingStats = async (req, res) => {
    try {
        const [lecturerStats] = await pool.execute(
            `SELECT lecturer_id, AVG(rating) AS avg_rating, COUNT(*) AS total_ratings
             FROM ratings
             GROUP BY lecturer_id`
        );

        const [courseStats] = await pool.execute(
            `SELECT course_id, AVG(rating) AS avg_rating, COUNT(*) AS total_ratings
             FROM ratings
             GROUP BY course_id`
        );

        res.json({
            success: true,
            stats: { lecturerStats, courseStats }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
