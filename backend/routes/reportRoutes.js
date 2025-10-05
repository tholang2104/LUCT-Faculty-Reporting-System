const express = require('express');
const router = express.Router();
const {
    createReport,
    getAllReports,
    getReportById,
    updateReport,
    deleteReport,
    addFeedback,
    getMonitoringStats,
    exportReportsToExcel
} = require('../controllers/reportController');
const { verifyToken, checkRole } = require('../middleware/auth');

// All routes require authentication
router.use(verifyToken);


// Static/specific routes first
// Get all reports (with role-based filtering)
router.get('/', getAllReports);

// Get monitoring statistics (Admin / PL / PRL)
router.get('/stats/monitoring', checkRole('pl', 'prl', 'admin'), getMonitoringStats);

// Export reports to Excel (Admin / PL / PRL)
router.get('/export/excel', checkRole('pl', 'prl', 'admin'), exportReportsToExcel);

// Add feedback to report (PRL or Admin)
router.post('/feedback', checkRole('prl', 'admin'), addFeedback);

// Create report (Lecturer only)
router.post('/', checkRole('lecturer'), createReport);

// Get report by ID
router.get('/:id', getReportById);

// Update report (Lecturer only)
router.put('/:id', checkRole('lecturer'), updateReport);

// Delete report (Lecturer only)
router.delete('/:id', checkRole('lecturer'), deleteReport);

module.exports = router;
