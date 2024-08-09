import {React, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadMintNft } from '../handlers/interactions'

const MintNft = () => {
  const [minting, setMinting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);

  const provider = useSelector((state) => state.provider.provider)
  const chainId = useSelector((state) => state.provider.network)
  const nft = useSelector((state) => state.nft.ncontract)
  let mintAmount

  const dispatch = useDispatch();

  const mintHandler = async () => {
    setMinting(true);
    console.log("minthandler activated")
    setAmount(1)

    const mintNft = await loadMintNft(provider, nft, chainId, amount, dispatch);
    setMinting(false);
  }
  return (
    <div>
    <h2>Mint NFTs</h2>
    <div className="mint-container">
      <p>only allowed to mint one nft at a time and a maximum of ....</p>
      {minting && nft? (
        <>
        <p>minting</p>
        </>
      ) : (
        <>
        <button onClick={mintHandler}>Mint NFT</button>
        </>)}
    </div>
</div>
  )
}

export default MintNft