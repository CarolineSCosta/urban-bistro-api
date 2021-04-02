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
      await database.ProductOrders.bulkCreate(
        body.products.map((product) => ({
          order_id: order.id,
          product_id: product.id,
          qtd: product.qtd,
          createdAt: new Date(),
          updatedAt: new Date(),

        })),
      );
      return res.status(200).json(await OrdersController.getById(order.id));
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getOrderById(req, res) {
    try {
      const order = OrdersController.getById(req.params.id);

      return res.status(200).json(
        order,
      );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async updateOrder(req, res) {
    try {
      const { body } = req;
      body.updatedAt = new Date();
      body.processedAt = new Date();

      await database.Orders.update(body, { where: { id: req.params.id } });
      await database.ProductOrders.destroy({ where: { order_id: req.params.id } });
      await database.ProductOrders.bulkCreate(
        body.products.map((product) => ({
          order_id: req.params.id,
          product_id: product.id,
          qtd: product.qtd,
          createdAt: new Date(),
          updatedAt: new Date(),

        })),
      );
      return res.status(200).json(
        await OrdersController.getById(req.params.id),
      );
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async deleteOrder(req, res) {
    try {
      const order = await OrdersController.getById(req.params.id);
      await database.ProductOrders.destroy({ where: { order_id: req.params.id } });
      await database.Orders.destroy({ where: { id: req.params.id } });
      return res.status(200).json(order);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getById(id) {
    const order = await database.Orders.findByPk(id, {
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
    return (
      {
        id: order.id,
        client_name: order.client_name,
        user_id: order.user_id,
        table: order.table,
        status: order.status,
        processedAt: order.processedAt,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        products: order.products.map((product) => ({
          id: product.id,
          name: product.name,
          flavor: product.flavor,
          complement: product.complement,
          qtd: product.ProductOrders.qtd,
        })),
      });
  }
}

module.exports = OrdersController;
