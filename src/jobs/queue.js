const Queue = require('bull');
const db = require("../models");
const mint = require("../lib/mint.js");
const logger = require("../../config/logger.js");
const helper = require("../helper.js");
const mintingQueue = new Queue('minting', 'redis://127.0.0.1:6379');

mintingQueue.process(async function(job, done) {
	var [success, tokenId, error] = await mint.mintNft(job.data);
	if(success) {
		done(null, tokenId);
	}else{
		done(error);
	}
});
(async() => {
	await mintingQueue.obliterate({ force: true });
	do {
		var nfts = await db.Nft.findAll({
				attributes: ["id", "nftId", "tokenURI", "transferAddress", "queued", "properties"],
				where: {executed: false, queued: false}, limit: 3, raw: true
		});
		if(nfts.length == 0) break;
		var minter = await db.Minter.findOne({where: {isLocked: false}});
		if(minter == null) {
			logger.error("No unlocked minters found");
			await helper.sleep(5);
		} else {
			let ids = [];
			for(let i=0; i<nfts.length; i++) {
				ids.push(nfts[i]['id']);
			}
			await db.Nft.update({queued: true}, {where: {id: ids}});
			mintingQueue.add(nfts);
		}
	} while(nfts.length != 0);
})();
console.log("Job done");
