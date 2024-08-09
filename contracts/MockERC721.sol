// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "node_modules/@openzeppelin/contracts/access/Ownable.sol";
import "node_modules/@openzeppelin/contracts/utils/Strings.sol";
import "node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract MockERC721 is ERC721Enumerable {
    using Strings for uint256;

    uint256 public cost;
    uint256 public maxSupply;
    uint256 public allowMintingOn;
    string public baseURI;
    string public baseExtension = '.json';

    event Mint(uint256 mintAmount, address minter);
    event Withdraw(uint256 amount, address owner);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _cost,
        uint256 _maxSupply,
        uint256 _allowMintingOn,
        string memory _baseURIIN

        ) ERC721(_name, _symbol){
        cost = _cost;
        maxSupply = _maxSupply;
        allowMintingOn = _allowMintingOn;
        baseURI = _baseURIIN;
    }

    function mint(uint256 _mintAmount) public payable {
        //require(msg.value >= cost * _mintAmount, "require 1 fail");
        //require(block.timestamp >= allowMintingOn, "require 2 fail");
        //require(_mintAmount >0 && _mintAmount <=5, "require 3 fail");


        uint256 supply = totalSupply();
        require(supply + _mintAmount <= maxSupply);

        for(uint256 i = 1; i <= _mintAmount; i++) {
            _safeMint(msg.sender, supply + i);
        }
        emit Mint(_mintAmount, msg.sender);
    }
    function tokenURI(uint256 _tokenId) public view virtual override returns(string memory){
        return(string(abi.encodePacked(baseURI, _tokenId.toString() , baseExtension)));
    }
    function walletOfOwner(address _owner) public view returns(uint256[] memory) {
        uint256 ownerTokenCount = balanceOf(_owner);
        uint256[] memory tokenIds = new uint256[](ownerTokenCount);
        for(uint256 i; i < ownerTokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(_owner, i);
        }
        return tokenIds;
    }

    function withdraw() public  {
        uint256 balance = address(this).balance;

        (bool successs, ) = payable(msg.sender).call{ value: balance}("");
        require(successs);

        emit Withdraw(balance, msg.sender);
    }

    function setCost(uint256 _newCost) public  {
        cost = _newCost;
    }


}
