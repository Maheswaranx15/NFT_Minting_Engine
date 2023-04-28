'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Network extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Network.init({
    name: DataTypes.STRING,
    chainId: DataTypes.STRING,
    rpcProvider: DataTypes.STRING,
    fastGas: DataTypes.INTEGER,
    avgGas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Network',
  });
  return Network;
};