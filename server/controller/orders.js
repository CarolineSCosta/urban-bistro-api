const database = require('../db/models');

class OrdersController {
  static async getOrders(_, res) {
    try {
      const orders = await database.Orders.findAll(
        {
          include: [{
            model: database.Products,
            as: 'products',
            attributes: ['id', 'name', 'flavor', 'complement'],
          }],
          through: {
            model: database.ProductOrders,
            attributes: ['qtd'],
          },
        },
      );

      return res.status(200).json(
        orders.map((order) => ({
          id: order.id,
          client_name: order.client_name,
          user_id: order.user_id,
          table: order.table,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          products: order.products.map((product) => ({
            id: product.id,
            name: product.name,
            flavor: product.flavor,
            complement: product.complement,
            qtd: product.ProductOrders.qtd,
          })),
        })),
      );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

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

  static async getOrderById(req, res) {
    try {
      const order = await database.Orders.findByPk(req.params.id, {
        include: [{
          model: database.Products,
          as: 'products',
          attributes: ['id', 'name', 'flavor', 'complement'],
        }],
        through: {
          model: database.ProductOrders,
          attributes: ['qtd'],
        },
      });

      return res.status(200).json(
        {
          id: order.id,
          client_name: order.client_name,
          user_id: order.user_id,
          table: order.table,
          status: order.status,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          products: order.products.map((product) => ({
            id: product.id,
            name: product.name,
            flavor: product.flavor,
            complement: product.complement,
            qtd: product.ProductOrders.qtd,
          })),
        },
      );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = OrdersController;
