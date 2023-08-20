const { body, validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name field is required'),
  body('email')
    .notEmpty()
    .withMessage('Email field is required')
    .isEmail()
    .withMessage('Email must be in a correct format'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password must have at least 8 characters')
    .matches(/[a-zA-Z]/)
    .withMessage('passwrod must contain at least one letter'),
  validateFields,
];

exports.createRestaurantValidation = [
  body('name').notEmpty().withMessage('Name field is required'),
  body('address').notEmpty().withMessage('Address field is required'),
  body('rating')
    .notEmpty()
    .withMessage('Rating field is required')
    .isNumeric()
    .withMessage('Rating must be a numerical value between 1 and 5')
    .custom((rating) => rating >= 1)
    .withMessage("Rating can't be less than 1")
    .custom((rating) => rating <= 5)
    .withMessage("Rating can't be more than 5"),
  validateFields,
];

exports.createReviewValidation = [
  body('comment').notEmpty().withMessage('Comment field is required'),
  body('rating')
    .notEmpty()
    .withMessage('Rating field is required')
    .isNumeric()
    .withMessage('Rating must be a numerical value between 1 and 5')
    .custom((rating) => rating >= 1)
    .withMessage("Rating can't be less than 1")
    .custom((rating) => rating <= 5)
    .withMessage("Rating can't be more than 5"),
  validateFields,
];
