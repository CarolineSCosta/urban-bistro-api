const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProductOrders extends Model { }
  ProductOrders.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qtd: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'ProductOrders',
  });
  return ProductOrders;
};
