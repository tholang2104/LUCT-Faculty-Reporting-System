const { pool } = require('../config/database');

// Get all courses (accessible by all authenticated users)
exports.getAllCourses = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM courses');
        res.json({ success: true, courses: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get course by ID
exports.getCourseById = async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT * FROM courses WHERE id = ?', [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Course not found' });
        res.json({ success: true, course: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get courses assigned to a lecturer
exports.getLecturerCourses = async (req, res) => {
    try {
        let lecturerId = req.params.lecturer_id;
        // If lecturer accessing own courses, use their own ID
        if (req.user.role === 'lecturer' && !lecturerId) {
            lecturerId = req.user.userId;
        }

        const [rows] = await pool.execute(
            `SELECT c.* FROM courses c
             JOIN course_assignments ca ON c.id = ca.course_id
             WHERE ca.lecturer_id = ?`,
            [lecturerId]
        );
        res.json({ success: true, courses: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get all lecturers (for course assignment)
exports.getAllLecturers = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            "SELECT id, full_name, email, faculty, program FROM users WHERE role='lecturer'"
        );
        // Map to a consumer-friendly shape
        const lecturers = rows.map(r => ({ id: r.id, name: r.full_name, email: r.email, faculty: r.faculty, program: r.program }));
        res.json({ success: true, lecturers });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create course (PL/Admin)
exports.createCourse = async (req, res) => {
    try {
        const { name, code, description } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO courses (name, code, description) VALUES (?, ?, ?)',
            [name, code, description]
        );
        res.status(201).json({ success: true, message: 'Course created', courseId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update course (PL/Admin)
exports.updateCourse = async (req, res) => {
    try {
        const { name, code, description } = req.body;
        const [result] = await pool.execute(
            'UPDATE courses SET name=?, code=?, description=? WHERE id=?',
            [name, code, description, req.params.id]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Course not found' });
        res.json({ success: true, message: 'Course updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete course (PL/Admin)
exports.deleteCourse = async (req, res) => {
    try {
        const [result] = await pool.execute('DELETE FROM courses WHERE id=?', [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Course not found' });
        res.json({ success: true, message: 'Course deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Assign lecturer to course (PL/Admin)
exports.assignLecturer = async (req, res) => {
    try {
        const { course_id, lecturer_id } = req.body;

        // Check if assignment already exists
        const [existing] = await pool.execute(
            'SELECT * FROM course_assignments WHERE course_id=? AND lecturer_id=?',
            [course_id, lecturer_id]
        );
        if (existing.length > 0) return res.status(400).json({ success: false, message: 'Lecturer already assigned to this course' });

        await pool.execute(
            'INSERT INTO course_assignments (course_id, lecturer_id) VALUES (?, ?)',
            [course_id, lecturer_id]
        );

        res.json({ success: true, message: 'Lecturer assigned to course' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
