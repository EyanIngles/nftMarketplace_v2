import React from 'react'

const buyNftPage = () => {
  return (<>
    <div>buyNftPage</div>
    <section id="buy-nfts" className="section">
          <h2>Buy NFTs</h2>
          <div className="nft-container">
            {/* Add available NFTs for purchase here */}
            <div className="nft-card">
              <img src="nft2.jpg" alt="NFT 2" />
              <div className="nft-info">
                <p>NFT 2 Description</p>
                <button>Buy</button>
              </div>
            </div>
            {/* More NFT items */}
          </div>
        </section>
    </>
  )
}

export default buyNftPage