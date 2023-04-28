'use strict';
var data = require('./network.json');
module.exports = {
  async up (queryInterface, Sequelize) {
	  data.map(network => Object.assign(network, {createdAt: new Date(), updatedAt: new Date()}));
	  return queryInterface.bulkInsert('Networks',data);
  },

  async down (queryInterface, Sequelize) {
	  return queryInterface.bulkDelete('Networks', null, {});
  }
};
