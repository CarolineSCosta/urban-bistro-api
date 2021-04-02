const database = require('../db/models');

class UsersController {
  static async getUsers(_, res) {
    try {
      const users = await database.Users.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async createUser(req, res) {
    try {
      const { body } = req;
      body.createdAt = new Date();
      body.updatedAt = new Date();

      const user = await database.Users.create(body);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await database.Users.findByPk(req.params.id);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async updateUser(req, res) {
    try {
      const { body } = req;
      body.updatedAt = new Date();

      await database.Users.update(body, { where: { id: req.params.id } });
      return UsersController.getUserById(req, res);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const user = await database.Users.findByPk(req.params.id);
      await database.Users.destroy({ where: { id: req.params.id } });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UsersController;
