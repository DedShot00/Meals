const express = require('express');

//* Controllers
const usersController = require('../controllers/user.controller');

//* Middlewares
const validationsMiddleware = require('../middlewares/validations.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const router = express.Router();

//* routes
//? ======================== //
//? ********* AUTH ********* //
//? ======================== //
router.post(
  '/signup',
  validationsMiddleware.createUserValidation,
  usersController.createUser
);

router.post('/login', usersController.login);
//? ************************ //

//? JWT validation
router.use(authMiddleware.protect);

//? =========================== //
//? ******* User orders ******* //
//? =========================== //
//TODO comprobar relaciones con meal y restaurant
router.get('/orders', usersController.getUserOrders);
router.get('/orders/:id', usersController.getUserOrderById)
//? *************************** //

//? ============================ //
//? **** Account management **** //
//? ============================ //
router
  .use('/:id', userMiddleware.validUser, authMiddleware.protectAccountOwner)
  .route('/:id')
  .patch(usersController.updateUser)
  .delete(usersController.deleteUser);
//? **************************** //

module.exports = router;
