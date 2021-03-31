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
    const { body } = req;
    body.createdAt = new Date();
    body.updatedAt = new Date();

    const product = await database.Products.create(body);
    return res.status(200).json(product);
  }

  static async getProductById(req, res) {
    const product = await database.Products.findByPk(req.params.id);
    return res.status(200).json(product);
  }

  static async updateProduct(req, res) {
    const { body } = req;
    body.updatedAt = new Date();

    await database.Products.update(body, { where: { id: req.params.id } });
    return ProductsController.getProductById(req, res);
  }

  static async deleteProduct(req, res) {
    const product = await database.Products.findByPk(req.params.id);
    await database.Products.destroy({ where: { id: req.params.id } });
    return res.status(200).json(product);
  }
}

module.exports = ProductsController;
