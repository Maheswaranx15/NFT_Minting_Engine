require("dotenv").config();
const axios = require('axios');
const gasStationApiURL = process.env.GAS_STATION_API_URL;
const defaultGasPrice = process.env.DEFAULT_GAS_PRICE;

const getGasPrice = async() => {
	try {
		res = await axios.get(gasStationApiURL);
		return parseInt(res['data']['result']['FastGasPrice']).toString();
	} catch(e) {
		return defaultGasPrice;	
	}
}

module.exports = {
	getGasPrice
}
