import React from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Button, Form} from 'react-bootstrap'
import { loadImportNftContract } from "../handlers/interactions";
import { ethers } from "ethers"

const MyNft = () => {
  const [nftContract, setNftContract] = useState("")

  const dispatch = useDispatch()
  const provider = useSelector((state) => state.provider.provider)
  const chainId = useSelector((state) => state.provider.network)
  const marketplace = useSelector((state) => state.marketplace.mContract)


  const myNFThandler = async () => {
    console.log("myNFThandler activated")
  }

  const importHandler = async () => {
    console.log(nftContract)
    const address = nftContract.toString()
    await loadImportNftContract(provider, marketplace, chainId, address, dispatch)

  }

  const inputHandler = (e) => {
    e.preventDefault()
    setNftContract(e.target.value)
  }
  return (
    <div>
      <section id="my-nfts" className="section">
    <h2>My NFTs</h2>
    <Button onClick={myNFThandler}>Load My Nft's</Button>
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
  </section>
      <div>
        <Form>
      <Form.Group className="mb-3" controlId="formNFTAddress">
        <Form.Label>Can not see all your NFT's? <br/>Please import the contract here.</Form.Label>
        <Form.Control type="text" placeholder="NFT contract"
        value={nftContract} onChange={inputHandler}/>
      </Form.Group>
        <Button variant="primary" type="button" onClick={importHandler}> Submit</Button>
        </Form>
      </div>
  </div>
  )
}

export default MyNft