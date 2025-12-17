const express = require('express');
const router = express.Router();
const {
  updateProfile,
  getInnovatorProfile,
  getInvestorProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/innovator/:id', getInnovatorProfile);
router.get('/investor/:id', getInvestorProfile);

// Protected routes
router.put('/profile', protect, updateProfile);

module.exports = router;
