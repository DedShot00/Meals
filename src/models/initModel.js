const Meal = require('./meal.model');
const Orders = require('./order.model');
const Restaurant = require('./restaurant.model');
const Reviews = require('./review.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Reviews)
  Reviews.belongsTo(User)

  User.hasMany(Orders)
  Orders.belongsTo(User)

  Orders.hasOne(Meal)
  Meal.belongsTo(Orders)

  Restaurant.hasMany(Meal)
  Meal.belongsTo(Restaurant)

  Restaurant.hasMany(Reviews)
  Reviews.belongsTo(Restaurant)
};

module.exports = initModel
