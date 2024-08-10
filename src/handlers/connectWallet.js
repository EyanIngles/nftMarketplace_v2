import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ethers } from 'ethers';
import { loadAccount, loadNetwork, loadProvider, loadMarketplace,
loadNft, loadVault, loadNftMintCost, loadNftBalance} from '../handlers/interactions';
import { Button } from 'react-bootstrap';
import Blockies from 'react-blockies';


const Connect = () => {
  // Fetching account from useSelector
const account = useSelector((state) => state.provider.account);
  // Dispatch
const dispatch = useDispatch();


  // useState for loading account and balance
const [balance, setBalance] = useState(0);
const [isLoading, setIsLoading] = useState(true);
let provider, chainId

  const loadBlockchain = async () => {
      // Load provider
    provider = await loadProvider(dispatch);
    chainId = await loadNetwork(dispatch, provider)
      // Load account
      const account = await loadAccount(dispatch);
      // Load account balance in ether
      let balance = await provider.getBalance(account);
      balance = ethers.formatEther(balance);
      setBalance(balance.slice(0, 7));

      const marketplace = await loadMarketplace(provider, chainId, dispatch)
      const nft = await loadNft(provider, chainId, dispatch)
      const vault = await loadVault(provider, chainId, dispatch)


      window.ethereum.on('accountsChanged', async () => {
        loadBlockchain();
      })
    setIsLoading(false);
  };

  // useEffect to load blockchain and access blockchain data
  useEffect(() => {
    if (isLoading && account) {
      loadBlockchain();
    }
  }, [isLoading, account]);

  return (
    <>
    {account ? (
      <div className='account-info'>
        <div className='blockie-container'>
        <Blockies
          className='blockie'
          seed={account}
        />
        </div>
        <p>{account.slice(0, 6)}...{account.slice(36, 42)}<br />{balance} ETH</p>
      </div>
    ) : (
      <div className='connect-button'>
      <Button className="btn-warning btn-lg" onClick={loadBlockchain}>Connect Wallet</Button>
      </div>
    )}
  </>
  );
};

export default Connect;
