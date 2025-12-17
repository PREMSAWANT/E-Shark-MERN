const Chat = require('../models/Chat');
const User = require('../models/User');
const Idea = require('../models/Idea');

// @desc    Create new chat or get existing one
// @route   POST /api/chats
// @access  Private (Investor only - can initiate)
const createChat = async (req, res, next) => {
  try {
    const { innovatorId, ideaId } = req.body;

    if (!innovatorId || !ideaId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide innovator ID and idea ID',
      });
    }

    // Verify innovator exists and is actually an innovator
    const innovator = await User.findById(innovatorId);
    if (!innovator || innovator.role !== 'innovator') {
      return res.status(400).json({
        success: false,
        message: 'Invalid innovator',
      });
    }

    // Verify idea exists
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(400).json({
        success: false,
        message: 'Idea not found',
      });
    }

    // Check if chat already exists between these two users for this idea
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, innovatorId] },
      relatedIdea: ideaId,
    })
      .populate('participants', 'name email role profilePhoto')
      .populate('relatedIdea', 'title category');

    if (chat) {
      return res.status(200).json({
        success: true,
        message: 'Chat already exists',
        data: chat,
      });
    }

    // Create new chat
    chat = await Chat.create({
      participants: [req.user._id, innovatorId],
      relatedIdea: ideaId,
      messages: [],
    });

    await chat.populate('participants', 'name email role profilePhoto');
    await chat.populate('relatedIdea', 'title category');

    res.status(201).json({
      success: true,
      message: 'Chat created successfully',
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all chats for logged-in user
// @route   GET /api/chats
// @access  Private
const getMyChats = async (req, res, next) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id,
    })
      .populate('participants', 'name email role profilePhoto')
      .populate('relatedIdea', 'title category')
      .sort('-lastMessage');

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single chat by ID
// @route   GET /api/chats/:id
// @access  Private
const getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('participants', 'name email role profilePhoto')
      .populate('relatedIdea', 'title category')
      .populate('messages.sender', 'name profilePhoto');

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(
      (participant) => participant._id.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this chat',
      });
    }

    res.status(200).json({
      success: true,
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Send message in chat
// @route   POST /api/chats/:id/messages
// @access  Private
const sendMessage = async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Message content is required',
      });
    }

    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(
      (participant) => participant.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to send messages in this chat',
      });
    }

    // Add message
    chat.messages.push({
      sender: req.user._id,
      content: content.trim(),
    });

    await chat.save();

    // Populate the new message
    await chat.populate('messages.sender', 'name profilePhoto');
    await chat.populate('participants', 'name email role profilePhoto');
    await chat.populate('relatedIdea', 'title category');

    // Get the last message
    const newMessage = chat.messages[chat.messages.length - 1];

    res.status(201).json({
      success: true,
      message: 'Message sent successfully',
      data: {
        chat,
        newMessage,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark messages as read
// @route   PATCH /api/chats/:id/read
// @access  Private
const markAsRead = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: 'Chat not found',
      });
    }

    // Check if user is participant
    const isParticipant = chat.participants.some(
      (participant) => participant.toString() === req.user._id.toString()
    );

    if (!isParticipant) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized',
      });
    }

    // Mark all messages not sent by current user as read
    chat.messages.forEach((message) => {
      if (message.sender.toString() !== req.user._id.toString()) {
        message.read = true;
      }
    });

    await chat.save();

    res.status(200).json({
      success: true,
      message: 'Messages marked as read',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChat,
  getMyChats,
  getChatById,
  sendMessage,
  markAsRead,
};
