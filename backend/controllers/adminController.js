const User = require('../models/User');
const Idea = require('../models/Idea');
const Chat = require('../models/Chat');

// @desc    Get all users with filters
// @route   GET /api/admin/users
// @access  Private (Admin only)
const getAllUsers = async (req, res, next) => {
  try {
    const { role, verified, search, page = 1, limit = 20 } = req.query;

    // Build filter
    const filter = {};
    if (role) filter.role = role;
    if (verified !== undefined) filter.verified = verified === 'true';
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const users = await User.find(filter)
      .select('-password')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await User.countDocuments(filter);

    res.status(200).json({
      success: true,
      data: users,
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

// @desc    Update user status (verify/ban)
// @route   PATCH /api/admin/users/:id
// @access  Private (Admin only)
const updateUserStatus = async (req, res, next) => {
  try {
    const { verified } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { verified },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'User status updated successfully',
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Prevent deleting other admins
    if (user.role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin users',
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all ideas for moderation
// @route   GET /api/admin/ideas
// @access  Private (Admin only)
const getAllIdeas = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};
    if (status) filter.status = status;

    const ideas = await Idea.find(filter)
      .populate('owner', 'name email profilePhoto')
      .sort('-createdAt')
      .limit(limit * 1)
      .skip((page - 1) * limit);

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

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
const getDashboardStats = async (req, res, next) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalInnovators = await User.countDocuments({ role: 'innovator' });
    const totalInvestors = await User.countDocuments({ role: 'investor' });
    const totalIdeas = await Idea.countDocuments();
    const pendingIdeas = await Idea.countDocuments({ status: 'submitted' });
    const approvedIdeas = await Idea.countDocuments({ status: 'reviewed' });
    const fundedIdeas = await Idea.countDocuments({ status: 'funded' });
    const totalChats = await Chat.countDocuments();

    // Get recent activities
    const recentIdeas = await Idea.find()
      .populate('owner', 'name email')
      .sort('-createdAt')
      .limit(5);

    const recentUsers = await User.find()
      .select('-password')
      .sort('-createdAt')
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        stats: {
          totalUsers,
          totalInnovators,
          totalInvestors,
          totalIdeas,
          pendingIdeas,
          approvedIdeas,
          fundedIdeas,
          totalChats,
        },
        recentIdeas,
        recentUsers,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  updateUserStatus,
  deleteUser,
  getAllIdeas,
  getDashboardStats,
};
