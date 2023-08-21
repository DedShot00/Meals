const express = require('express');

//* Controllers
const ordersController = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const validationsMiddleware = require('../middlewares/validations.middleware');

//* Middlewares

const router = express.Router();

//* routes
//? JWT Protected routes below
router.use(authMiddleware.protect);

router
  .route('/')
  .post(
    validationsMiddleware.createOrderValidation,
    ordersController.createOrder
  );

router.get('/me', ordersController.getMyOrders);

router
  .use('/:id', authMiddleware.protectOrderOwner)
  .route('/:id')
  .patch(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);

module.exports = router;
