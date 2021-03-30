module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addConstraint('Orders',
      {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'custom_fk_orders_user_id',
        references: {
          table: 'Users',
          field: 'id',
        },
      });
    await queryInterface.addConstraint('ProductOrders',
      {
        fields: ['order_id'],
        type: 'foreign key',
        name: 'custom_fk_productorders_order_id',
        references: {
          table: 'Orders',
          field: 'id',
        },
      });
    await queryInterface.addConstraint('ProductOrders',
      {
        fields: ['product_id'],
        type: 'foreign key',
        name: 'custom_fk_productorders_product_id',
        references: {
          table: 'Products',
          field: 'id',
        },
      });
  },
  down: async (queryInterface) => {
    await queryInterface.removeConstraint('Orders', 'custom_fk_orders_user_id');
    await queryInterface.removeConstraint('ProductOrders', 'custom_fk_productorders_order_id');
    await queryInterface.removeConstraint('ProductOrders', 'custom_fk_productorders_product_id');
  },
};
