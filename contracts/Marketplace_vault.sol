// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.25;

import {Ownable} from "node_modules/@openzeppelin/contracts/access/Ownable.sol";
import {IERC721} from "node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import {IERC20} from "node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MarketplaceVault is Ownable {
    address public marketplaceContract;
    uint256 public nextListingNumber;

    mapping(uint256 => NFT) public listedNfts;

    enum NFTStatus {
        Unlisted,
        Listed,
        Sold
    }

    struct NFT {
        uint256 listedNumber;
        IERC721 contractAddress;
        uint256 tokenId;
        uint256 price;
        address seller;
        NFTStatus status;
    }

    event NFTListed(uint256 indexed listedNumber, uint256 tokenId, uint256 price, address seller);
    event NFTUnlisted(uint256 indexed listedNumber, uint256 tokenId);
    event NFTSold(uint256 indexed listedNumber, uint256 tokenId, uint256 price, address buyer);

    constructor(address _marketplaceContract) Ownable(msg.sender) {
        marketplaceContract = _marketplaceContract;
    }

    function listNft(IERC721 _NFT, uint256 _tokenId, uint256 _price, address _seller) external {
        require(msg.sender == marketplaceContract, "You are not authorised");

        // Transfer NFT to the contract
        _NFT.transferFrom(_seller, address(this), _tokenId);

        listedNfts[nextListingNumber] = NFT({
            listedNumber: nextListingNumber,
            contractAddress: _NFT,
            tokenId: _tokenId,
            price: _price,
            seller: _seller,
            status: NFTStatus.Listed
        });

        emit NFTListed(nextListingNumber, _tokenId, _price, _seller);

        nextListingNumber++;
    }

    function unlistNft(uint256 _listedNumber) external {
        require(msg.sender == marketplaceContract, "You are not authorised");
        NFT storage nft = listedNfts[_listedNumber];
        require(nft.status == NFTStatus.Listed, "NFT is not listed");

        // Transfer NFT back to the seller
        nft.contractAddress.transferFrom(address(this), nft.seller, nft.tokenId);

        nft.status = NFTStatus.Unlisted;

        emit NFTUnlisted(_listedNumber, nft.tokenId);
    }

    function markNftAsSold(uint256 _listedNumber, address _buyer) external payable {
        require(msg.sender == marketplaceContract, "You are not authorised");
        NFT storage nft = listedNfts[_listedNumber];
        require(nft.status == NFTStatus.Listed, "NFT is not listed");
        require(msg.value >= nft.price, "Not enough Ether sent");

        nft.status = NFTStatus.Sold; // mark as sold

        // Transfer Ether to the seller
        (bool success,) = nft.seller.call{value: nft.price}("");
        require(success, "Transfer of Ether was unsuccessful");

        nft.contractAddress.safeTransferFrom(address(this), _buyer, nft.tokenId);

        emit NFTSold(_listedNumber, nft.tokenId, nft.price, _buyer);
    }

    function withdrawLockedFunds(address _tokenAddress, address _to) external onlyOwner {
        IERC20 _token = IERC20(_tokenAddress);
        uint256 amount = _token.balanceOf(address(this));
        require(amount > 0, "No funds to withdraw");

        _token.transfer(_to, amount);
    }

    receive() external payable {} // Function to receive Ether. msg.data must be empty
}
