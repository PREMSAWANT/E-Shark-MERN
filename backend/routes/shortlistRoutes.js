const express = require('express');
const router = express.Router();
const {
  addToShortlist,
  getMyShortlist,
  removeFromShortlist,
  updateShortlist,
  checkShortlist,
} = require('../controllers/shortlistController');
const { protect, requireRole } = require('../middleware/authMiddleware');

// All routes require investor authentication
router.use(protect);
router.use(requireRole('investor'));

// Shortlist operations
router.post('/', addToShortlist);
router.get('/', getMyShortlist);
router.get('/check/:ideaId', checkShortlist);
router.put('/:ideaId', updateShortlist);
router.delete('/:ideaId', removeFromShortlist);

module.exports = router;
