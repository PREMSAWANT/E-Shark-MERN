const express = require('express');
const router = express.Router();
const {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  updateIdeaStatus,
  incrementViews,
  toggleLike,
  getMyIdeas,
} = require('../controllers/ideaController');
const { protect, requireRole } = require('../middleware/authMiddleware');
const { ideaValidation } = require('../middleware/validationMiddleware');

// Public routes
router.get('/', getIdeas);
router.get('/:id', getIdeaById);
router.patch('/:id/view', incrementViews);

// Protected routes
router.get('/my/ideas', protect, requireRole('innovator'), getMyIdeas);
router.post('/', protect, requireRole('innovator'), ideaValidation, createIdea);
router.put('/:id', protect, requireRole('innovator'), updateIdea);
router.delete('/:id', protect, requireRole('innovator'), deleteIdea);
router.patch('/:id/like', protect, toggleLike);

// Admin routes
router.patch(
  '/:id/status',
  protect,
  requireRole('admin'),
  updateIdeaStatus
);

module.exports = router;
