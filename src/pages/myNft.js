import React from 'react'

const myNft = () => {
  return (
    <div> <section id="my-nfts" className="section">
    <h2>My NFTs</h2>
    <div className="nft-container">
      {/* Add your NFT items here */}
      <div className="nft-card">
        <img src="nft1.jpg" alt="NFT 1" />
        <div className="nft-info">
          <p>NFT 1 Description</p>
        </div>
      </div>
      {/* More NFT items */}
    </div>
  </section></div>
  )
}

export default myNft