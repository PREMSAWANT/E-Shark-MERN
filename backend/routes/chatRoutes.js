const express = require('express');
const router = express.Router();
const {
  createChat,
  getMyChats,
  getChatById,
  sendMessage,
  markAsRead,
} = require('../controllers/chatController');
const { protect, requireRole } = require('../middleware/authMiddleware');

// All routes require authentication
router.use(protect);

// Get all user's chats
router.get('/', getMyChats);

// Get single chat
router.get('/:id', getChatById);

// Create new chat (investor only)
router.post('/', requireRole('investor'), createChat);

// Send message in chat
router.post('/:id/messages', sendMessage);

// Mark messages as read
router.patch('/:id/read', markAsRead);

module.exports = router;
