'use strict';
var data = require('./minters.json');
module.exports = {
  async up (queryInterface, Sequelize) {
    data.map(minter => Object.assign(minter, {createdAt: new Date(), updatedAt: new Date()}));
    return queryInterface.bulkInsert('Minters', data);
  },

  async down (queryInterface, Sequelize) {
	  return queryInterface.bulkDelete('Minters', null, {});
  }
};
