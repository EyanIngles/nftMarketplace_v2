import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadMintNft } from '../handlers/interactions';
import Carousel from 'react-bootstrap/Carousel';

const MintNft = () => {
  const [minting, setMinting] = useState(false);
  const [amount, setAmount] = useState(0);
  const provider = useSelector((state) => state.provider.provider);
  const chainId = useSelector((state) => state.provider.network);
  const nft = useSelector((state) => state.nft.ncontract);

  const dispatch = useDispatch();

  const mintHandler = async () => {
    setMinting(true);
    console.log("minthandler activated");
    setAmount(1);
    await loadMintNft(provider, nft, chainId, amount, dispatch);
    setMinting(false);
  };

  // Dummy data for previously minted NFTs (replace with actual data)
  const mintedNfts = [
    { id: 1, imgSrc: 'path-to-image-1.jpg', title: 'NFT 1' },
    { id: 2, imgSrc: 'path-to-image-2.jpg', title: 'NFT 2' },
    { id: 3, imgSrc: 'path-to-image-3.jpg', title: 'NFT 3' },
  ];

  return (
    <div>
      <h2>Mint NFTs</h2>
      <div className="mint-container">
        <p>Only allowed to mint one NFT at a time and a maximum of ....</p>
        {minting && nft ? (
          <>
            <p>Minting in progress...</p>
          </>
        ) : (
          <>
            <button onClick={mintHandler}>Mint NFT</button>
          </>
        )}

        <div className="carousel-container">
          <h3>Previously Minted NFTs</h3>
          <Carousel>
            {mintedNfts.map((nft) => (
              <Carousel.Item key={nft.id}>
                <img src={nft.imgSrc} alt={nft.title} className="d-block w-100" />
                <Carousel.Caption>
                  <h5>{nft.title}</h5>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default MintNft;
