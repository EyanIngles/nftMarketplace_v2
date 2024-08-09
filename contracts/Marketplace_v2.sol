pragma solidity 0.8.25;

import {ERC721Enumerable} from "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {Ownable} from "node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace_v2 is Ownable {
    ERC721Enumerable[] public contractAddresses;

    constructor() Ownable(msg.sender) {}

    function importNftContract(ERC721Enumerable _contractAddress) public onlyOwner {
        require(address(_contractAddress) != address(0), "Address cannot be a zero address.");
        contractAddresses.push(_contractAddress);
    }

    function checkBalanceOfNfts(address _nftOwner) public view returns (uint256) {
        uint256 totalBalance = 0;
        for (uint256 i = 0; i < contractAddresses.length; i++) {
            totalBalance += contractAddresses[i].balanceOf(_nftOwner);
        }
        return totalBalance;
    }

    function getTokenIds(address _nftOwner) public view returns (uint256[] memory) {
        uint256 totalBalance = checkBalanceOfNfts(_nftOwner);
        uint256[] memory tokenIds = new uint256[](totalBalance);
        uint256 counter = 0;

        for (uint256 i = 0; i < contractAddresses.length; i++) {
            uint256 balance = contractAddresses[i].balanceOf(_nftOwner);
            for (uint256 j = 0; j < balance; j++) {
                tokenIds[counter] = contractAddresses[i].tokenOfOwnerByIndex(_nftOwner, j);
                counter++;
            }
        }
        return tokenIds;
    }

    function getNFTName(ERC721Enumerable _contractAddress) public view returns (string memory) {
        string memory name = _contractAddress.name();
        return name;
    }

    function getNFTSymbol(ERC721Enumerable _contractAddress) public view returns (string memory) {
        string memory symbol = _contractAddress.symbol();
        return symbol;
    }

    function getNFTTokenURI(ERC721Enumerable _contractAddress, uint256 _TokenId) public view returns (string memory) {
        string memory URI = _contractAddress.tokenURI(_TokenId);
        return URI;
    }
}
