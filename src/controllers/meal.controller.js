const catchAsync = require('../utils/catchAsync');
const Meal = require('../models/meal.model');
const AppError = require('../utils/appError');
const Restaurant = require('../models/restaurant.model');

exports.findAllMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: true,
    },
    include: [{ model: Restaurant }],
  });
  return res.status(200).json({
    status: 'Success',
    message: 'Successfully retrieved meals',
    results: meals.length,
    meals: meals,
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meal = await Meal.findOne({
    where: {
      id,
      status: true,
    },
    include: [{ model: Restaurant }],
  });

  if (!meal) {
    return next(new AppError('Meal not found', 404));
  }

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully retrieved meal',
    meal,
  });
});

exports.createMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { id } = req.params;

  const meal = await Meal.create({
    name,
    price,
    restaurantId: id,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'Successfully created meal',
    meal,
  });
});

exports.updateMeal = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const { meal } = req;

  await meal.update({
    name,
    price,
  });

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully updated meal',
  });
});

exports.deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;

  await meal.update({ status: false });

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully deleted meal',
  });
});
