'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Nfts', 'queued', {
	  defaultValue: false,
          type: Sequelize.DataTypes.BOOLEAN
        }, { transaction: t }),
        queryInterface.addColumn('Nfts', 'properties', {
          type: Sequelize.DataTypes.JSON,
        }, { transaction: t })
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Nfts', 'queued', { transaction: t }),
        queryInterface.removeColumn('Nfts', 'properties', { transaction: t })
      ]);
    });
  }
};
