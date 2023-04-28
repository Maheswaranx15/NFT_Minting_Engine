require("dotenv").config();
const ethers = require('ethers');
const db = require("../models");
const logger = require("../../config/logger.js");
const helper = require("../helper.js");
const gasStation = require('./gasStation.js');
const abi = require("../../config/abi/operator.json")['abi'];
const provider = new ethers.providers.JsonRpcProvider(process.env.JSON_RPC_PROVIDER);
const operatorContractAddress = process.env.OPERATOR_CONTRACT_ADDRESS;
const contractAddress = process.env.CONTRACT_ADDRESS;
const creatorAddress = process.env.CREATOR_ADDRESS;

async function mintNft(data) {
	var minter = await db.Minter.findOne({where: {isLocked: false}});
	if(minter == null) {
		logger.error("No unlocked minter");
		return [false, null, new Error('No unlocked minter')];
	}
	await db.Minter.update({isLocked: true}, {where: {id: minter.dataValues['id']}});
	var privateKey = minter.dataValues['privateKey'];
	const wallet = new ethers.Wallet(privateKey, provider);
	const topicName = ethers.utils.id("Transfer(address,address,uint256)");
	const contract = new ethers.Contract(operatorContractAddress, abi, wallet);
	logger.info("Minter: %s", wallet.address);
	let isMinter = await contract.isMinter(wallet.address);
	if(!isMinter) {
		logger.error("%s is not minter.", wallet.address);
		return [false, null, new Error(`Invalid minter - ${wallet.address}`)];
	}
	let [tokensURI, receivers] = getMintingData(data);
	let gasPrice = await gasStation.getGasPrice();
	try {
		var  estimatedGas = await contract.estimateGas.batchMint721(
			contractAddress,
			creatorAddress,
			tokensURI,
			receivers
		);
		var  txn = await contract.batchMint721(
			contractAddress,
			creatorAddress,
			tokensURI,
			receivers,
			{gasPrice: ethers.utils.parseUnits(gasPrice, "gwei"), gasLimit: estimatedGas}
		);
	} catch(e) {
		logger.error(e);
		return [false, null, new Error(e)];
	}
	await db.Minter.update({lastTxnHash: txn['hash'], isLocked: true}, {where: {id: minter.dataValues['id']}});
	await helper.sleep(3);
	for(const index in data){
		await db.Nft.update({txnHash: txn['hash']}, {where: {id: data[index]['id']}});
	};
	var tx = await txn.wait();
	await db.Minter.update({lastTxnHash: null, isLocked: false}, {where: {id: minter.dataValues['id']}});
	let mintingInfo = {"txnId": txn['hash']};
	let tokenIds = [];
	tokenIds = tx.logs.filter(r=>{return r.topics[0]== topicName}).map(l=>{return parseInt(l.topics[3])});
	tokenIds = Array.from(new Set(tokenIds));
	for(let i=0; i<data.length; i++) {
		var mintedNft = data[i];
		Object.assign(mintedNft, {tokenId: tokenIds[i], txId: txn['hash']})
		helper.writeObj(mintedNft);
		await db.Nft.update({executed: true, tokenId: tokenIds[i]}, {where: {id: data[i]['id']}});
	}
	Object.assign(mintingInfo, {"tokenIds": tokenIds});
	logger.info("mint:mintNft %o", mintingInfo);
	return [true, mintingInfo, ""];
}

function getMintingData(data) {
	let tokenURI = [];
	let receivers = [];
	data.forEach( nft => {
		tokenURI.push(nft["tokenURI"]);
		receivers.push(nft["transferAddress"]);
	});
	return [tokenURI, receivers];
}

module.exports = {
	mintNft
};
