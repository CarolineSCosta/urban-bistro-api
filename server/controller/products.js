const database = require('../db/models');

class ProductsController {
  static async getProducts(_, res) {
    try {
      const products = await database.Products.findAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async createProduct(req, res) {
    try {
      const { body } = req;
      body.createdAt = new Date();
      body.updatedAt = new Date();

      const product = await database.Products.create(body);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getProductById(req, res) {
    try {
      const product = await database.Products.findByPk(req.params.id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async updateProduct(req, res) {
    try {
      const { body } = req;
      body.updatedAt = new Date();

      await database.Products.update(body, { where: { id: req.params.id } });
      return res.status(200).json(ProductsController.getProductById(req, res));
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const product = await database.Products.findByPk(req.params.id);
      await database.Products.destroy({ where: { id: req.params.id } });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = ProductsController;
