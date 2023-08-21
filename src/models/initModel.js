const Meal = require('./meal.model');
const Orders = require('./order.model');
const Restaurant = require('./restaurant.model');
const Reviews = require('./review.model');
const User = require('./user.model');

const initModel = () => {
  User.hasMany(Reviews, { foreignKey: 'userId' })
  Reviews.belongsTo(User, { foreignKey: 'userId' })

  User.hasMany(Orders,{ foreignKey: 'userId' })
  Orders.belongsTo(User,{ foreignKey: 'userId' })

  Meal.hasOne(Orders,{ foreignKey: 'mealId' })
  Orders.belongsTo(Meal,{ foreignKey: 'mealId' })

  Restaurant.hasMany(Meal,{ foreignKey: 'restaurantId' })
  Meal.belongsTo(Restaurant,{ foreignKey: 'restaurantId' })

  Restaurant.hasMany(Reviews,{ foreignKey: 'restaurantId' })
  Reviews.belongsTo(Restaurant,{ foreignKey: 'restaurantId' })
};

module.exports = initModel
