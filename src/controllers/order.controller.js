const catchAsync = require('../utils/catchAsync');
const Order = require('../models/order.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const AppError = require('../utils/appError');

exports.createOrder = catchAsync(async (req, res, next) => {
  const {currentUser} = req
  const {quantity, mealId} = req.body
  
  const meal = await Meal.findOne({
    where:{
      id: mealId,
      status: true
    }
  })

  if (!meal) {
    return next( new AppError('Meal not found',404))
  }

  const totalPrice = quantity * meal.price

  const order = await Order.create({
    mealId: meal.id,
    userId: currentUser.id,
    quantity,
    totalPrice,
  })

  return res.status(201).json({
    status: 'Success',
    message: 'Successfully created order',
    order
  });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  const orders = await Order.findAll({
    where: {
      userId: currentUser.id,
    },
    include: [
      {
        model: Meal,
        include:[{model: Restaurant}]
      },
    ],
  });

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully retrieved user orders',
    results: orders.length,
    orders,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const {order} = req

  await order.update({status: 'completed'})

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully completed order',
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const {order} = req

  await order.update({status: 'cancelled'})

  return res.status(200).json({
    status: 'Success',
    message: 'Successfully cancelled order',
  });
});
