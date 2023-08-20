const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user.model');
const generatejwt = require('../utils/jwt');
const Orders = require('../models/order.model');
const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
      status: true,
    },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect login credentials', 401));
  }

  const token = await generatejwt(user.id);

  return res.status(200).json({
    status: 'succes',
    message: 'Loged in successfully',
    token,
    user,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(12);
  const encryptedPass = await bcrypt.hash(password, salt);

  const hola = 'asdfasdf'.toLowerCase;
  console.log(hola);

  const user = await User.create({
    name: name.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    password: encryptedPass,
    role: role,
  });

  const token = await generatejwt(user.id);

  return res.status(201).json({
    status: 'success',
    message: 'Succesfully created user',
    token,
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'Successfully updated user',
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({ status: false });

  return res.status(200).json({
    status: 'success',
    message: 'Successfully deleted user',
  });
});

exports.getUserOrders = catchAsync(async (req, res, next) => {
  const { currentUser } = req;

  const orders = await Orders.findAll({
    where: { userId: currentUser.id },
    include: [{ model: Meal, include: [{ model: Restaurant }] }],
  });

  return res.status(200).json({
    status: 'success',
    message: 'Successfully retrieved orders',
    results: orders.length,
    orders,
  });
});

exports.getUserOrderById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  const order = await Orders.findOne({
    where: {
      userId: currentUser.id,
      id,
    },
    include: [{ model: Meal, include: [{ model: Restaurant }] }],
  });

  if (!order) {
    return next(new AppError('order not found', 404));
  }

  return res.status(200).json({
    status: 'success',
    message: 'Successfully retrieved orders',
    order,
  });
});
