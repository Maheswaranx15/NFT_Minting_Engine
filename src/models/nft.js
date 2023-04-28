'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nft extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Nft.init({
    nftId: DataTypes.INTEGER,
    tokenURI: DataTypes.STRING,
    transferAddress: DataTypes.STRING,
    txnHash: DataTypes.STRING,
    tokenId: DataTypes.INTEGER,
    executed: DataTypes.BOOLEAN,
    confirmed: DataTypes.BOOLEAN,
    queued: DataTypes.BOOLEAN,
    properties: DataTypes.JSON,
    gas: DataTypes.INTEGER,
    usd: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Nft',
  });
  return Nft;
};
