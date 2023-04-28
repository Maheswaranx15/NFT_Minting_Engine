data = []
nfts = Nft.where(nft_contract_id: 208)
nfts.each do |nft|
  statistics = nft.nft_statistics
  properties = []
  statistics.each do |stat|
    properties.push([
      stat.statistic.name.downcase,
      [
        stat.attributes["value"],
        stat.attributes["maximum"] || 0
      ]
    ])
  end
  owner_slug = nft.nft_owners.first.owner_slug
  address = User.fetch_crypto_accounts([owner_slug])[owner_slug]['crypto_address'] 
  data.push(
    nftId: nft.id,
    #name: nft.name,
    properties: [properties],
    tokenURI: nft.metadata_ipfs_hash,
    transferAddress: address
  ) if address.present?
end
