// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const config = require('../src/abis/config.json');

const tokens = (n) => {
    return ethers.parseUnits(n.toString(), 'ether')
}

async function main() {

    console.log(`Fetching accounts and network details... \n`)
    const accounts = await ethers.getSigners()
    const deployer = accounts[0]


    //Fetch network
    const { chainId } =  await ethers.provider.getNetwork()
    console.log(`Fetching token and transferring to accounts \n`)

    const nft = await ethers.getContractAt('MockERC721', config[chainId].nft.address)
    console.log(`nft data fetched: ${await nft.getAddress()} \n`)

    const marketplace = await ethers.getContractAt('Marketplace_v2', config[chainId].marketplace.address)
    console.log(`marketplace data fetched: ${await marketplace.getAddress()} \n`)

    const tx = await marketplace.connect(deployer).importNftContract(nft)
    const result = await tx.wait()

    console.log("contract imported to marketplace", result)

    // import nft too and have 2 address mint an nft each
    

  console.log(`Finished! \n`)
}


// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
