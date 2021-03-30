const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate(models) {
      Orders.belongsTo(models.Users, {
        foreignKey: 'user_id',
        as: 'user',
      });
      Orders.belongsToMany(models.Products, {
        through: 'ProductOrders',
        as: 'products',
        foreignKey: 'order_id',
        otherKey: 'product_id',
      });
    }
  }
  Orders.init({
    user_id: DataTypes.INTEGER,
    client_name: DataTypes.STRING,
    table: DataTypes.INTEGER,
    status: DataTypes.STRING,
    processedAt: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
