// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
// deploy contracts
  const MARKETPLACE = await hre.ethers.getContractFactory("Marketplace_v2");
  const marketplace = await MARKETPLACE.deploy()

  const marketplaceAddress = await marketplace.getAddress();


  console.log(`uploaded marketplace contract too: ${marketplaceAddress}`)


  const VAULT = await hre.ethers.getContractFactory("MarketplaceVault");
  const vault = await VAULT.deploy(marketplace.getAddress());

  const vaultAddress = await vault.getAddress();


  console.log(`uploaded vault contract too: ${vaultAddress}`)

  const name = 'mockNFT'
  const symbol = 'NFT'
  const cost = ethers.parseUnits('0.025', 'ether')
  const maxSupply = 25
  const baseURI = 'ipfs://QmQ2jnDYecFhrf3asENjyjZRX1pZSsNWG3qHzmNDvXa9qg/'
  const allowMintingOn = 0 //(Date.now() + 60000).toString().slice(0,10) // slice to take off the miliseconds


  const NFT = await hre.ethers.getContractFactory("MockERC721");
  const nft = await NFT.deploy(name, symbol, cost, maxSupply, allowMintingOn, baseURI) // mock up for testing;

  const costNFT = await nft.cost();
  console.log(`nft cost is:: ${costNFT}`)

  const NFT1 = await hre.ethers.getContractFactory("MockERC721");
  const nft1 = await NFT1.deploy(name, symbol, cost, maxSupply, allowMintingOn, baseURI) // mock up for testing;

  const costNFT1 = await nft1.cost();
  console.log(`nft cost is:: ${costNFT1}`)


  const nftAddress = await nft.getAddress();

  console.log(`uploaded nft contract too: ${nftAddress}`)

  const nftAddress1 = await nft1.getAddress();

  console.log(`uploaded nft1 contract too: ${nftAddress1}`)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
