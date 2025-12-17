const Idea = require('../models/Idea');
const { cloudinary } = require('../config/cloudinary');

// Helper function to upload file to Cloudinary
const uploadToCloudinary = (fileBuffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `e-shark/${folder}`,
        resource_type: 'auto',
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
};

// @desc    Create new idea/pitch
// @route   POST /api/ideas
// @access  Private (Innovator only)
const createIdea = async (req, res, next) => {
  try {
    const {
      title,
      category,
      problemStatement,
      solution,
      marketSize,
      revenueModel,
      fundingRequired,
      currentStage,
      roadmap,
    } = req.body;

    // Create idea
    const idea = await Idea.create({
      title,
      category,
      owner: req.user._id,
      problemStatement,
      solution,
      marketSize,
      revenueModel,
      fundingRequired,
      currentStage,
      roadmap,
    });

    // Populate owner details
    await idea.populate('owner', 'name email role profilePhoto');

    res.status(201).json({
      success: true,
      message: 'Idea created successfully',
      data: idea,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all ideas with filters
// @route   GET /api/ideas
// @access  Public
const getIdeas = async (req, res, next) => {
  try {
    const {
      category,
      status,
      search,
      currentStage,
      minFunding,
      maxFunding,
      page = 1,
      limit = 12,
      sort = '-createdAt',
    } = req.query;

    // Build filter object
    const filter = {};

    // Only show approved ideas to non-admins
    if (!req.user || req.user.role !== 'admin') {
      filter.status = { $in: ['reviewed', 'shortlisted', 'funded'] };
    } else if (status) {
      filter.status = status;
    }

    if (category) filter.category = category;
    if (currentStage) filter.currentStage = currentStage;
    if (minFunding || maxFunding) {
      filter.fundingRequired = {};
      if (minFunding) filter.fundingRequired.$gte = Number(minFunding);
      if (maxFunding) filter.fundingRequired.$lte = Number(maxFunding);
    }

    // Text search
    if (search) {
      filter.$text = { $search: search };
    }

    // Execute query with pagination
    const ideas = await Idea.find(filter)
      .populate('owner', 'name email role profilePhoto skills background')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    // Get total count
    const count = await Idea.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: ideas,
      pagination: {
        currentPage: Number(page),
        totalPages: Math.ceil(count / limit),
        totalItems: count,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single idea by ID
// @route   GET /api/ideas/:id
// @access  Public
const getIdeaById = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id).populate(
      'owner',
      'name email role profilePhoto skills background teamMembers'
    );

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found',
      });
    }

    res.status(200).json({
      success: true,
      data: idea,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update idea
// @route   PUT /api/ideas/:id
// @access  Private (Innovator - own ideas only)
const updateIdea = async (req, res, next) => {
  try {
    let idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found',
      });
    }

    // Check ownership
    if (idea.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this idea',
      });
    }

    // Update idea
    idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('owner', 'name email role profilePhoto');

    res.status(200).json({
      success: true,
      message: 'Idea updated successfully',
      data: idea,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete idea
// @route   DELETE /api/ideas/:id
// @access  Private (Innovator - own ideas only)
const deleteIdea = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found',
      });
    }

    // Check ownership
    if (idea.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this idea',
      });
    }

    await idea.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Idea deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update idea status (Admin only)
// @route   PATCH /api/ideas/:id/status
// @access  Private (Admin only)
const updateIdeaStatus = async (req, res, next) => {
  try {
    const { status, adminNotes } = req.body;

    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true, runValidators: true }
    ).populate('owner', 'name email');

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Idea status updated successfully',
      data: idea,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Increment views
// @route   PATCH /api/ideas/:id/view
// @access  Public
const incrementViews = async (req, res, next) => {
  try {
    const idea = await Idea.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { views: idea.views },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle like
// @route   PATCH /api/ideas/:id/like
// @access  Private
const toggleLike = async (req, res, next) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found',
      });
    }

    const userId = req.user._id;
    const likeIndex = idea.likes.indexOf(userId);

    if (likeIndex === -1) {
      // Add like
      idea.likes.push(userId);
    } else {
      // Remove like
      idea.likes.splice(likeIndex, 1);
    }

    await idea.save();

    res.status(200).json({
      success: true,
      data: {
        likes: idea.likes.length,
        isLiked: likeIndex === -1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get innovator's own ideas
// @route   GET /api/ideas/my-ideas
// @access  Private (Innovator)
const getMyIdeas = async (req, res, next) => {
  try {
    const ideas = await Idea.find({ owner: req.user._id }).sort('-createdAt');

    res.status(200).json({
      success: true,
      data: ideas,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdea,
  deleteIdea,
  updateIdeaStatus,
  incrementViews,
  toggleLike,
  getMyIdeas,
};
