data = []
nfts = Nft.where(nft_contract_id: 208)
nfts.each do |nft|
  owner_slug = NftOwner.unscoped.where(nft_id: nft.id).where.not(drops_id: nil).first.owner_slug
  address = User.fetch_crypto_accounts([owner_slug])[owner_slug]['crypto_address'] 
  data.push(
    nftId: nft.id,
    tokenURI: nft.metadata_ipfs_hash,
    transferAddress: address
  )
end
