const catchAsync = require('../utils/catchAsync');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');

exports.validRestaurant = catchAsync(async(req, res, next) => {
  const {id} = req.params 
  const restaurant = await Restaurant.findOne({
    where:{
      id,
      status: true
    }
  })

  if (!restaurant) {
    next(new AppError('Restaurant not found',404))
  }

  req.restaurant = restaurant
  next();
});