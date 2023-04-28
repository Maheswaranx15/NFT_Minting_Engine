'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Nfts', 'gas', {
          type: Sequelize.DataTypes.INTEGER
        }, { transaction: t }),
        queryInterface.addColumn('Nfts', 'usd', {
          type: Sequelize.DataTypes.INTEGER,
        }, { transaction: t })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Nfts', 'gas', { transaction: t }),
        queryInterface.removeColumn('Nfts', 'usd', { transaction: t })
      ]);
    });
  }
};
