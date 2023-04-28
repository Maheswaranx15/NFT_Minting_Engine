require("dotenv").config();
const winston = require('winston');
const ethers = require('ethers');
const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.printf(({message }) => `${message}`)
  ),
  transports: [
    new winston.transports.File({
      filename: 'data/production.json',
      maxsize: 5242880
    })
  ],
});

function writeObj(obj) {
	logger.info("%o", obj);
}

function sleep(s) {
  var ms = s * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const wallet = (privateKey) => {
  return new ethers.Wallet(privateKey, provider);
}

module.exports = {
	writeObj,
  sleep,
  wallet,
  provider,
  ethers
}
