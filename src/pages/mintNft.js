import React from 'react'

const mintNft = () => {
  return (
    <div><section id="mint-nfts" className="section">
    <h2>Mint NFTs</h2>
    <div className="mint-container">
      <form>
        <label htmlFor="nft-name">NFT Name:</label>
        <input type="text" id="nft-name" name="nft-name" required />

        <label htmlFor="nft-description">NFT Description:</label>
        <textarea id="nft-description" name="nft-description" required></textarea>

        <label htmlFor="nft-image">NFT Image:</label>
        <input type="file" id="nft-image" name="nft-image" required />

        <button type="submit">Mint NFT</button>
      </form>
    </div>
  </section></div>
  )
}

export default mintNft