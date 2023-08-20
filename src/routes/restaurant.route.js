const express = require('express');

//* Controllers
const restaurantController = require('../controllers/restaurant.controller');
const reviewController = require('../controllers/reviews.controller');

//* Middlewares
const validationsMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const restaurantMiddleware = require('../middlewares/restaurant.middleware');

const router = express.Router();

//* routes
router.get('/', restaurantController.findAllRestaurants);
router.get('/:id', restaurantController.getById);

//? JWT Protected routes below
router.use(authMiddleware.protect);

//? =========================== //
//? Reviews creation and update //
//? =========================== //
router.post(
  '/reviews/:id',
  validationsMiddleware.createReviewValidation,
  reviewController.createReview
);

router.patch(
  '/reviews/:restaurantId/:id',
  authMiddleware.protectReviewOwner,
  reviewController.updateReview
);
router.delete(
  '/reviews/:restaurantId/:id',
  authMiddleware.protectReviewOwner,
  reviewController.deleteReview
);
//? *************************** //

//? =============================== //
//? Restaurants creation and update //
//? =============================== //
router.post(
  '/',
  authMiddleware.restrictTo('admin'),
  validationsMiddleware.createRestaurantValidation,
  restaurantController.createRestaurant
);

router
  .use(
    '/:id',
    authMiddleware.restrictTo('admin'),
    restaurantMiddleware.validRestaurant
  )
  .route('/:id')
  .patch(restaurantController.updateRestaurant)
  .delete(restaurantController.deleteRestaurant);
//? ******************************* //

module.exports = router;
