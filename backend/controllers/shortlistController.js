const Shortlist = require('../models/Shortlist');
const Idea = require('../models/Idea');

// @desc    Add idea to shortlist
// @route   POST /api/shortlist
// @access  Private (Investor only)
const addToShortlist = async (req, res, next) => {
  try {
    const { ideaId, notes, interestLevel } = req.body;

    if (!ideaId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an idea ID',
      });
    }

    // Check if idea exists
    const idea = await Idea.findById(ideaId);
    if (!idea) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found',
      });
    }

    // Check if already shortlisted
    const existingShortlist = await Shortlist.findOne({
      investor: req.user._id,
      idea: ideaId,
    });

    if (existingShortlist) {
      return res.status(400).json({
        success: false,
        message: 'Idea already in your shortlist',
      });
    }

    // Create shortlist entry
    const shortlist = await Shortlist.create({
      investor: req.user._id,
      idea: ideaId,
      notes: notes || '',
      interestLevel: interestLevel || 'medium',
    });

    await shortlist.populate('idea');

    res.status(201).json({
      success: true,
      message: 'Idea added to shortlist',
      data: shortlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get investor's shortlist
// @route   GET /api/shortlist
// @access  Private (Investor only)
const getMyShortlist = async (req, res, next) => {
  try {
    const shortlist = await Shortlist.find({ investor: req.user._id })
      .populate({
        path: 'idea',
        populate: {
          path: 'owner',
          select: 'name email profilePhoto',
        },
      })
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      data: shortlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove idea from shortlist
// @route   DELETE /api/shortlist/:ideaId
// @access  Private (Investor only)
const removeFromShortlist = async (req, res, next) => {
  try {
    const shortlist = await Shortlist.findOneAndDelete({
      investor: req.user._id,
      idea: req.params.ideaId,
    });

    if (!shortlist) {
      return res.status(404).json({
        success: false,
        message: 'Idea not found in shortlist',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Idea removed from shortlist',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update shortlist entry
// @route   PUT /api/shortlist/:ideaId
// @access  Private (Investor only)
const updateShortlist = async (req, res, next) => {
  try {
    const { notes, interestLevel } = req.body;

    const shortlist = await Shortlist.findOneAndUpdate(
      {
        investor: req.user._id,
        idea: req.params.ideaId,
      },
      { notes, interestLevel },
      { new: true, runValidators: true }
    ).populate('idea');

    if (!shortlist) {
      return res.status(404).json({
        success: false,
        message: 'Shortlist entry not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Shortlist updated successfully',
      data: shortlist,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Check if idea is shortlisted
// @route   GET /api/shortlist/check/:ideaId
// @access  Private (Investor only)
const checkShortlist = async (req, res, next) => {
  try {
    const shortlist = await Shortlist.findOne({
      investor: req.user._id,
      idea: req.params.ideaId,
    });

    res.status(200).json({
      success: true,
      data: {
        isShortlisted: !!shortlist,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addToShortlist,
  getMyShortlist,
  removeFromShortlist,
  updateShortlist,
  checkShortlist,
};
