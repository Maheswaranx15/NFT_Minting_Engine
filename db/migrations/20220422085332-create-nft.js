'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nfts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nftId: {
        type: Sequelize.INTEGER
      },
      tokenURI: {
        type: Sequelize.STRING
      },
      transferAddress: {
        type: Sequelize.STRING
      },
      txnHash: {
        type: Sequelize.STRING
      },
      tokenId: {
	type: Sequelize.INTEGER
      },
      executed: {
	defaultValue: false,
        type: Sequelize.BOOLEAN
      },
      confirmed: {
	defaultValue: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Nfts');
  }
};
