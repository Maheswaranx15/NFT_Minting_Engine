'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Minters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      privateKey: {
        type: Sequelize.STRING,
	allowNull: false
      },
      lastTxnHash: {
        type: Sequelize.STRING
      },
      balance: {
        type: Sequelize.INTEGER,
	allowNull: false	
      },
      isLocked: {
        type: Sequelize.BOOLEAN,
	defaultValue: false,
	allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Minters');
  }
};
