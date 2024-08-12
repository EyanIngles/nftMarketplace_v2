import { setAccount, setNetwork, setProvider } from "../store/providerStore";
import { setMarketContract, setNftBalance,
    setImportNftContract, setGetTokenIds } from "../store/marketplaceStore";
import { setVaultContract } from "../store/vaultStore";
import { setNftContract, setMintNft, setNftMintCost } from "../store/nftStore";
import { ethers } from "ethers";
//import abis
import MARKETPLACE_ABI from "../abis/MARKETPLACE_ABI.json";
import NFT_ABI from "../abis/NFT_ABI.json";
import VAULT_ABI from "../abis/VAULT_ABI.json";
import config from '../abis/config.json';


export const loadProvider = async (dispatch) => {
        const provider = new ethers.BrowserProvider(window.ethereum);
        //const provider = new ethers.JsonRpcProvider('http://127.0.0.1:8545/') //hardhat HTTP
        dispatch(setProvider(provider))

    return provider;
}

export const loadAccount = async (dispatch) => {
//connecting to meta mask with a try and catch to catch an error if metamask if not installed
if(typeof window.ethereum !== 'undefined') {
    try{
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        dispatch(setAccount(account));

        return account;
    } catch(err) {
        window.alert('Metamask unable to be located. Please install metamask and try again.')
        const deadAccount = ''
        dispatch(setAccount(deadAccount));
    }
}

}

export const loadNetwork = async (dispatch, provider) => {
    const chainId = (await provider.getNetwork()).chainId.toString()
    dispatch(setNetwork(chainId))

    return chainId
}

export const loadMarketplace = async (provider, chainId, dispatch) => {
    const marketplace = new ethers.Contract(config[chainId].marketplace.address, MARKETPLACE_ABI, provider)

    dispatch(setMarketContract(marketplace))

    return marketplace
}
export const loadVault = async (provider, chainId, dispatch) => {
    const vault = new ethers.Contract(config[chainId].vault.address, VAULT_ABI, provider)

    dispatch(setVaultContract(vault))

    return vault
}
export const loadNft = async (provider, chainId, dispatch) => {
    const nft = new ethers.Contract(config[chainId].nft.address, NFT_ABI, provider)

    dispatch(setNftContract(nft))

    return nft
}

export const loadNftMintCost = async (provider, nft, chainId, dispatch) => {
    // Ensure nft is passed correctly and not reloaded
    if (!nft) {
        nft = await loadNft(provider, chainId, dispatch);
    }

    try {
        const formatCost = await nft.cost(); // Get the BigNumber directly
        console.log("Raw cost from contract:", formatCost.toString()); // Log raw cost
        const nftCost = ethers.formatEther(formatCost); // Format to Ether
        console.log("Formatted cost in ETH:", nftCost); // Log formatted cost

        dispatch(setNftMintCost(nftCost));
        return nftCost;
    } catch (error) {
        console.error("Error fetching NFT cost:", error);
        return "0.0";
    }
};

export const loadNftBalance = async (provider, marketplace, chainId, dispatch) => {
    if (!marketplace) {
        marketplace = await loadMarketplace(provider, chainId, dispatch);
    }

    try {
        const account = await loadAccount(dispatch);
        const nftBalanceBIG = await marketplace.checkBalanceOfNfts(account);
        const nftBalance = ethers.formatUnits(nftBalanceBIG, 0)

        await loadGetTokenIds(provider, marketplace, chainId, dispatch)



        console.log("NFT Balance:", nftBalance); // Log the NFT balance

        dispatch(setNftBalance(nftBalance));
        return nftBalance;
    } catch (error) {
        console.error("Error fetching NFT balance:", error);
        return "0";
    }
};

export const loadMintNft = async (provider, nft, chainId, amount, dispatch) => {
    const signer = await provider.getSigner()
    //retrieve the cost of the nft collection
    const cost = "25000000000000000" //unable to get costs, something wrong with the mock nft contract.
    amount = 1;
    nft = await loadNft(provider, chainId, dispatch);
    const transaction = await nft.connect(signer).mint(amount, { value: cost });
    let result = await transaction.wait()
    const marketplace = await loadMarketplace(provider, chainId, dispatch)

    dispatch(setMintNft(result))

    // after function loading
    await loadNftBalance(provider, marketplace, chainId, dispatch)
    await loadGetTokenIds(provider, marketplace, chainId, dispatch)

    return result
}
export const loadImportNftContract = async (provider, marketplace, chainId, address, dispatch) => {
    const signer = await provider.getSigner()
    marketplace = await loadMarketplace(provider, chainId, dispatch);

    const transaction = await marketplace.connect(signer).importNftContract(address)
    const result = await transaction.wait()

    await loadNftBalance(provider, marketplace, chainId, dispatch)
    await loadGetTokenIds(provider, marketplace, chainId, dispatch)

    dispatch(setImportNftContract(result))

    return result;
}

export const loadGetTokenIds = async (provider, marketplace, chainId, dispatch) => {
    try {
        const account = await loadAccount(dispatch);
        marketplace = await loadMarketplace(provider, chainId, dispatch);

        // Call the smart contract function to get the array of token IDs and corresponding contract addresses
        const [tokenIds, contractAddresses] = await marketplace.getTokenIdsAndContract(account);

        // Create an array of objects that pairs token IDs with their corresponding contract addresses
        const result = tokenIds.map((tokenId, index) => ({
            tokenId: ethers.formatUnits(tokenId, 0),
            contractAddress: contractAddresses[index],
        }));

        // Dispatch the array of formatted token IDs and contract addresses to the store
        dispatch(setGetTokenIds(result));

        // Return the array of formatted token IDs and contract addresses
        return result;
    } catch (error) {
        console.error("Error fetching token IDs and contract addresses:", error);
        return [];
    }
};





