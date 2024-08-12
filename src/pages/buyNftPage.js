import React from 'react';
import '../buyNftPage.css';

const BuyNftPage = () => {
  const nfts = [
    { id: 1, name: "Dapp Punks", symbol: "Dpunks", description: "Description for NFT 1", image: "nft1.jpg" },
    { id: 2, name: "NFT 2", symbol: "NFT2", description: "Description for NFT 2", image: "nft2.jpg" },
    { id: 2, name: "NFT 2", symbol: "NFT2", description: "Description for NFT 2", image: "nft2.jpg" },
    { id: 2, name: "NFT 2", symbol: "NFT2", description: "Description for NFT 2", image: "nft2.jpg" },
    { id: 2, name: "NFT 2", symbol: "NFT2", description: "Description for NFT 2", image: "nft2.jpg" },
    // Add more NFTs here
  ];

  return (
    <div>
      <h2 className='center'>Buy NFTs</h2>
      <section id="buy-nfts" className="NFT-section">
        <div className="nft-container">
          {nfts.map((nft) => (
            <div className="nft-card" key={nft.id}>
              <img src={nft.image} alt={nft.name} className="nft-image" />
              <div className="nft-info">
                <h3>{nft.name}</h3>
                <p>Symbol: {nft.symbol}</p>
                <p>{nft.description}</p>
                <button>Buy</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default BuyNftPage;
