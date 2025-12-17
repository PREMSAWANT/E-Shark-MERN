const { body, validationResult } = require('express-validator');

// Validation result checker
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Registration validation
const registerValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['innovator', 'investor', 'admin'])
    .withMessage('Invalid role'),
  validate,
];

// Login validation
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email')
    .normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

// Idea creation validation
const ideaValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot exceed 100 characters'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
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
    ])
    .withMessage('Invalid category'),
  body('problemStatement')
    .trim()
    .notEmpty()
    .withMessage('Problem statement is required'),
  body('solution').trim().notEmpty().withMessage('Solution is required'),
  body('fundingRequired')
    .notEmpty()
    .withMessage('Funding required is required')
    .isNumeric()
    .withMessage('Funding must be a number')
    .custom((value) => value >= 0)
    .withMessage('Funding cannot be negative'),
  body('currentStage')
    .optional()
    .isIn(['Idea', 'Prototype', 'MVP', 'Early Revenue', 'Scaling'])
    .withMessage('Invalid stage'),
  validate,
];

module.exports = {
  registerValidation,
  loginValidation,
  ideaValidation,
};
