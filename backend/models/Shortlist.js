const mongoose = require('mongoose');

const shortlistSchema = new mongoose.Schema(
  {
    investor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    idea: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Idea',
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    interestLevel: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
  },
  {
    timestamps: true,
  }
);

// Ensure unique combination of investor and idea
shortlistSchema.index({ investor: 1, idea: 1 }, { unique: true });

module.exports = mongoose.model('Shortlist', shortlistSchema);
