const User = require('../models/User');

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const allowedFields = [
      'name',
      'profilePhoto',
      'skills',
      'background',
      'teamMembers',
      'bio',
      'interests',
      'pastInvestments',
      'investmentRange',
    ];

    // Filter only allowed fields from request
    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedFields.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get innovator public profile
// @route   GET /api/users/innovator/:id
// @access  Public
const getInnovatorProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      'name email role profilePhoto skills background teamMembers createdAt'
    );

    if (!user || user.role !== 'innovator') {
      return res.status(404).json({
        success: false,
        message: 'Innovator not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get investor public profile
// @route   GET /api/users/investor/:id
// @access  Public
const getInvestorProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select(
      'name email role profilePhoto bio interests pastInvestments investmentRange createdAt'
    );

    if (!user || user.role !== 'investor') {
      return res.status(404).json({
        success: false,
        message: 'Investor not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateProfile,
  getInnovatorProfile,
  getInvestorProfile,
};
