const mongoose = require('mongoose');

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title for your idea'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters'],
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Technology',
        'Healthcare',
        'Education',
        'Finance',
        'E-commerce',
        'Agriculture',
        'Environment',
        'Entertainment',
        'Food & Beverage',
        'Fashion',
        'Real Estate',
        'Other',
      ],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // Pitch Details
    problemStatement: {
      type: String,
      required: [true, 'Please describe the problem you are solving'],
    },
    solution: {
      type: String,
      required: [true, 'Please describe your solution'],
    },
    marketSize: {
      type: String,
      default: '',
    },
    revenueModel: {
      type: String,
      default: '',
    },
    fundingRequired: {
      type: Number,
      required: [true, 'Please specify the funding required'],
      min: [0, 'Funding amount cannot be negative'],
    },
    currentStage: {
      type: String,
      enum: ['Idea', 'Prototype', 'MVP', 'Early Revenue', 'Scaling'],
      default: 'Idea',
    },
    roadmap: {
      type: String,
      default: '',
    },
    // Status tracking
    status: {
      type: String,
      enum: ['submitted', 'reviewed', 'shortlisted', 'funded', 'rejected'],
      default: 'submitted',
    },
    // Metrics
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
      default: [],
    },
    // Media
    images: {
      type: [String],
      default: [],
    },
    documents: {
      type: [String],
      default: [],
    },
    // Admin notes
    adminNotes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

// Index for search and filtering
ideaSchema.index({ title: 'text', problemStatement: 'text', solution: 'text' });
ideaSchema.index({ category: 1, status: 1 });
ideaSchema.index({ owner: 1 });

module.exports = mongoose.model('Idea', ideaSchema);
