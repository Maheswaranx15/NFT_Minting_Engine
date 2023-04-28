'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Minter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Minter.init({
    privateKey: DataTypes.STRING,
    lastTxnHash: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    isLocked: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Minter',
  });
  return Minter;
};