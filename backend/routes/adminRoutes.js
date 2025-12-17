const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllIdeas,
  getDashboardStats,
} = require('../controllers/adminController');
const { protect, requireRole } = require('../middleware/authMiddleware');

// All routes require admin authentication
router.use(protect);
router.use(requireRole('admin'));

// User management
router.get('/users', getAllUsers);
router.patch('/users/:id', updateUserStatus);
router.delete('/users/:id', deleteUser);

// Idea management
router.get('/ideas', getAllIdeas);

// Dashboard stats
router.get('/stats', getDashboardStats);

module.exports = router;
