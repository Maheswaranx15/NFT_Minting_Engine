const helper = require("../helper.js");
const Minter = require("../models").Minter;
const logger = require("../../config/logger.js");
(async() => {
	while(true) {
		let minters = await Minter.findAll({raw: true});
		for(let i=0; i < minters.length; i++) {
			let wallet = helper.wallet(minters[i]['privateKey']);
			let balance = await helper.provider.getBalance(wallet.address);
			let etherBalance = parseInt(helper.ethers.utils.formatEther(balance));
			let isLocked = (etherBalance < 1) ? true : false;
			Minter.update({balance: etherBalance, isLocked: isLocked}, {where: {id: minters[i]['id']}});
			if(isLocked) {
				logger.error("jobs:updateBalance wallet locked due to Insufficient fund. %s:%d", wallet.address, etherBalance);
			}
		}
		await helper.sleep(10);
	}
})();