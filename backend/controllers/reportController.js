const { pool } = require('../config/database');
const ExcelJS = require('exceljs');

// Get all reports (role-based filtering)
exports.getAllReports = async (req, res) => {
    try {
        let query = `SELECT lr.*, u.full_name AS lecturer_name, c.course_name, c.course_code
                                 FROM lecturer_reports lr
                                 JOIN users u ON lr.lecturer_id = u.id
                                 JOIN courses c ON lr.course_id = c.id`;
        const params = [];

        // If lecturer, only their own reports
        if (req.user.role === 'lecturer') {
            query += ' WHERE lr.lecturer_id = ?';
            params.push(req.user.userId);
        }

        const [rows] = await pool.execute(query, params);
        res.json({ success: true, reports: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get report by ID
exports.getReportById = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT lr.*, u.full_name AS lecturer_name, c.course_name, c.course_code
             FROM lecturer_reports lr
             JOIN users u ON lr.lecturer_id = u.id
             JOIN courses c ON lr.course_id = c.id
             WHERE lr.id = ?`,
            [req.params.id]
        );
        if (rows.length === 0) return res.status(404).json({ success: false, message: 'Report not found' });
        res.json({ success: true, report: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Create report (Lecturer)
exports.createReport = async (req, res) => {
    try {
        const {
            course_id,
            faculty_name,
            class_name,
            week_of_reporting,
            date_of_lecture,
            actual_students_present,
            total_registered_students,
            venue,
            scheduled_time,
            topic_taught,
            learning_outcomes,
            recommendations
        } = req.body;

        const [result] = await pool.execute(
            `INSERT INTO lecturer_reports
             (course_id, lecturer_id, faculty_name, class_name, week_of_reporting, date_of_lecture,
                actual_students_present, total_registered_students, venue, scheduled_time,
                topic_taught, learning_outcomes, recommendations)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                course_id,
                req.user.userId,
                faculty_name,
                class_name,
                week_of_reporting,
                date_of_lecture,
                actual_students_present,
                total_registered_students,
                venue,
                scheduled_time,
                topic_taught,
                learning_outcomes,
                recommendations
            ]
        );

        res.status(201).json({ success: true, message: 'Report created', reportId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Update report (Lecturer)
exports.updateReport = async (req, res) => {
    try {
        const {
            course_id,
            faculty_name,
            class_name,
            week_of_reporting,
            date_of_lecture,
            actual_students_present,
            total_registered_students,
            venue,
            scheduled_time,
            topic_taught,
            learning_outcomes,
            recommendations,
            status
        } = req.body;

        const [result] = await pool.execute(
            `UPDATE lecturer_reports SET course_id=?, faculty_name=?, class_name=?, week_of_reporting=?, date_of_lecture=?,
             actual_students_present=?, total_registered_students=?, venue=?, scheduled_time=?, topic_taught=?,
             learning_outcomes=?, recommendations=?, status=? WHERE id=? AND lecturer_id=?`,
            [
                course_id,
                faculty_name,
                class_name,
                week_of_reporting,
                date_of_lecture,
                actual_students_present,
                total_registered_students,
                venue,
                scheduled_time,
                topic_taught,
                learning_outcomes,
                recommendations,
                status,
                req.params.id,
                req.user.userId
            ]
        );

        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Report not found or not yours' });
        res.json({ success: true, message: 'Report updated' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Delete report (Lecturer)
exports.deleteReport = async (req, res) => {
    try {
        const [result] = await pool.execute(
            'DELETE FROM lecturer_reports WHERE id=? AND lecturer_id=?',
            [req.params.id, req.user.userId]
        );
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Report not found or not yours' });
        res.json({ success: true, message: 'Report deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Add feedback (PRL/Admin) - insert into report_feedback
exports.addFeedback = async (req, res) => {
    try {
        const { report_id, feedback } = req.body;
        const prl_id = req.user.userId;

        // ensure report exists
        const [existing] = await pool.execute('SELECT id FROM lecturer_reports WHERE id=?', [report_id]);
        if (existing.length === 0) return res.status(404).json({ success: false, message: 'Report not found' });

        await pool.execute('INSERT INTO report_feedback (report_id, prl_id, feedback) VALUES (?, ?, ?)', [report_id, prl_id, feedback]);
        res.json({ success: true, message: 'Feedback added' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Get monitoring statistics (Admin / PL / PRL)
exports.getMonitoringStats = async (req, res) => {
    try {
        const [totalReports] = await pool.execute('SELECT COUNT(*) AS total FROM lecturer_reports');
        const [averageAttendance] = await pool.execute(
            'SELECT AVG(actual_students_present/NULLIF(total_registered_students,0)*100) AS avg_attendance FROM lecturer_reports'
        );

        const avg = averageAttendance[0].avg_attendance === null ? '0.00%' : Number(averageAttendance[0].avg_attendance).toFixed(2) + '%';

        res.json({
            success: true,
            stats: {
                totalReports: totalReports[0].total,
                averageAttendance: avg
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// Export reports to Excel (Admin / PL / PRL)
exports.exportReportsToExcel = async (req, res) => {
    try {
        const [rows] = await pool.execute(
            `SELECT lr.*, u.full_name AS lecturer_name, c.course_name, c.course_code
             FROM lecturer_reports lr
             JOIN users u ON lr.lecturer_id = u.id
             JOIN courses c ON lr.course_id = c.id`
        );

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Reports');

        sheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Course Code', key: 'course_code', width: 15 },
            { header: 'Course Name', key: 'course_name', width: 25 },
            { header: 'Lecturer', key: 'lecturer_name', width: 25 },
            { header: 'Week', key: 'week_of_reporting', width: 10 },
            { header: 'Class Name', key: 'class_name', width: 20 },
            { header: 'Date of Lecture', key: 'date_of_lecture', width: 15 },
            { header: 'Students Present', key: 'actual_students_present', width: 18 },
            { header: 'Total Registered', key: 'total_registered_students', width: 18 },
            { header: 'Venue', key: 'venue', width: 20 },
            { header: 'Scheduled Time', key: 'scheduled_time', width: 15 },
            { header: 'Topic Taught', key: 'topic_taught', width: 30 },
            { header: 'Learning Outcomes', key: 'learning_outcomes', width: 30 },
            { header: 'Recommendations', key: 'recommendations', width: 30 },
            { header: 'Status', key: 'status', width: 12 },
            { header: 'Created At', key: 'created_at', width: 20 }
        ];

        const mapped = rows.map(r => ({
            id: r.id,
            course_code: r.course_code,
            course_name: r.course_name,
            lecturer_name: r.lecturer_name,
            week_of_reporting: r.week_of_reporting,
            class_name: r.class_name,
            date_of_lecture: r.date_of_lecture,
            actual_students_present: r.actual_students_present,
            total_registered_students: r.total_registered_students,
            venue: r.venue,
            scheduled_time: r.scheduled_time,
            topic_taught: r.topic_taught,
            learning_outcomes: r.learning_outcomes,
            recommendations: r.recommendations,
            status: r.status,
            created_at: r.created_at
        }));

        sheet.addRows(mapped);

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=reports.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
