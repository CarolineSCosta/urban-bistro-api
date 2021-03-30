const express = require('express');
const controller = require('../controller/orders');

const router = express.Router();

const { createOrder } = controller;

router
  .route('/')
  .get((req, res) => {
    req.send('Cria novo produto');
  })
  .post(createOrder);

router
  .route('/:id')
  .get((req, res) => {
    req.send('Pega dados do pedido');
  })
  .put((req, res) => {
    req.send('Atualiza os dados do pedido');
  })
  .delete((req, res) => {
    req.send('Deleta os dados do pedido');
  });

module.exports = router;
