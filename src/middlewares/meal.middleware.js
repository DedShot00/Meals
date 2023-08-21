const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');
const AppError = require('../utils/appError');

exports.validMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({ where: { id, status: true } });

  if (!meal) {
    return next(new AppError('meal not found',404))
  }

  req.meal = meal
  next();
});
