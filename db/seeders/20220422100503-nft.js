'use strict';
var data = require("./nfts.json");
module.exports = {
  up: (queryInterface, Sequelize) => {
    var records = [];
    data.forEach( nft => {
      nft['properties'] = JSON.stringify(nft['properties']);
      nft['createdAt'] = new Date(),
      nft['updatedAt'] = new Date()
      records.push(nft);
    });
    return queryInterface.bulkInsert('Nfts', records);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Nfts', null, {});
  }
};
