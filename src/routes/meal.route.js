const express = require('express');

//* Controllers
const mealController = require('../controllers/meal.controller');

//* Middlewares
const validationsMiddleware = require('../middlewares/validations.middleware')
const authMiddleware = require('../middlewares/auth.middleware')
const mealMiddleware = require('../middlewares/meal.middleware')

const router = express.Router();

//* routes
router.get('/',mealController.findAllMeals);
router.get('/:id',mealController.getById)

//? JWT Protected routes below
router.use(authMiddleware.protect)

router
  .use('/:id',authMiddleware.restrictTo('admin'))
  .route('/:id')
  .post(validationsMiddleware.createMealValidation, mealController.createMeal)
  .patch(mealMiddleware.validMeal, mealController.updateMeal)
  .delete(mealMiddleware.validMeal, mealController.deleteMeal);

module.exports = router;
