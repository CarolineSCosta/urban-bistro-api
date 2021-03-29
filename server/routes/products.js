const express = require('express');

const router = express.Router();

const {
  getProducts, createProduct, getProductById, updateProduct, deleteProduct,
} = controller;

router
  .route('/')
  .get(getProducts)
  .post(createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
