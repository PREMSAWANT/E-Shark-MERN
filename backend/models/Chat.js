const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    relatedIdea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
      required: true,
    },
    messages: [messageSchema],
    lastMessage: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure only 2 participants
chatSchema.pre('save', function (next) {
  if (this.participants.length !== 2) {
    next(new Error('A chat must have exactly 2 participants'));
  }
  next();
});

// Update lastMessage timestamp when a message is added
chatSchema.pre('save', function (next) {
  if (this.messages.length > 0) {
    this.lastMessage = this.messages[this.messages.length - 1].createdAt;
  }
  next();
});

module.exports = mongoose.model('Chat', chatSchema);
