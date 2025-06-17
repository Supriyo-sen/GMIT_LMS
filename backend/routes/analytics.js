const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const {
    getDashboardAnalytics,
    getCourseAnalytics,
    getInstructorEarnings
} = require('../controllers/analytics');

// Dashboard analytics - Admin only
router.get('/dashboard', auth, isAdmin, getDashboardAnalytics);

// Course analytics - Admin only
router.get('/courses', auth, isAdmin, getCourseAnalytics);

// Instructor earnings - Admin only
router.get('/instructor-earnings', auth, isAdmin, getInstructorEarnings);


module.exports = router;
