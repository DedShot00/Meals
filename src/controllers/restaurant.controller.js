const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');
const Reviews = require('../models/review.model');

exports.findAllRestaurants = catchAsync(async (req, res, next) => {
  const restaurants = await Restaurant.findAll({
    where: {
      status: true,
    },
    include: [{ model: Reviews }],
  });

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully retrieved restaurants',
    restaurants,
  });
});

exports.getById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const restaurant = await Restaurant.findOne({
    where: { id, status: true },
    include: [{ model: Reviews }],
  });

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully retrieved restaurant',
    restaurant,
  });
});

exports.createRestaurant = catchAsync(async (req, res, next) => {
  const { name, address, rating } = req.body;

  const restaurant = await Restaurant.create({ name, address, rating });
  return res.status(201).json({
    status: 'success',
    message: 'Successfully created restaurant',
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res, next) => {
  const {name, address} = req.body
  const {restaurant} = req


  await restaurant.update({name, address})

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully updated restaurant',
  });
});

exports.deleteRestaurant = catchAsync(async (req, res, next) => {
  const {restaurant} = req

  await restaurant.update({status: false})
   
  return res.status(200).json({
    status: 'Success',
    message: 'Successfully deleted restaurant'
  });
});
