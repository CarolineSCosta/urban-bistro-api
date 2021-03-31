const express = require('express');
const controller = require('../controller/orders');

const router = express.Router();

const {
  getOrders, createOrder,
} = controller;

router
  .route('/')
  .get(getOrders)
  .post(createOrder);

router
  .route('/:id')
/* .get(getOrderById)
.put(updateOrder)
.delete(deleteOrder);
*/
module.exports = router;
