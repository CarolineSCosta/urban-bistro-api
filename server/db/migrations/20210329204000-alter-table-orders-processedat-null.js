module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'processedAt', { allowNull: true, type: Sequelize.DATE });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Orders', 'processedAt', { allowNull: false, type: Sequelize.DATE });
  },
};
