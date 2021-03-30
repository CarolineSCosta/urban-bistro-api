const database = require('../db/models');

class OrdersController {
  static async createOrder(req, res) {
    try {
      const { body } = req;
      body.createdAt = new Date();
      body.updatedAt = new Date();
      body.status = 'pending';

      const order = await database.Orders.create(body);
      body.products.forEach(async (product) => {
        const productOrder = {
          order_id: order.id,
          product_id: product.id,
          qtd: product.qtd,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await database.ProductOrders.create(productOrder);
      });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = OrdersController;
