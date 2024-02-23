// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

struct Listing {
    uint256 price;
    address seller;
}

contract MarketPlace is ERC721URIStorage, Ownable {
    uint256 private _ids = 0;
    mapping(uint256 => Listing) private _listings;

    event NFTTransfer(uint256 tokenID, address from, address to, string tokenURI, uint256 price);

    constructor(
        address initialOwner
    ) ERC721("NFT Token", "NFT") Ownable(initialOwner) {}

    // Minting a new NFT
    function createToken(string calldata tokenURI) public {
        uint256 currentId = _ids++;
        _safeMint(msg.sender, currentId);
        _setTokenURI(currentId, tokenURI);
        emit NFTTransfer(currentId, address(0),msg.sender, tokenURI, 0);
    }

    // List a NFT
    function listNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "Price must be greater than 0");

        // Only owner of token could approve a transfer request, so it verifies that the owner is calling the approve function, and owner gives the permission to the contract to transfer the ownership, basically transferring rights to this contract
        approve(address(this), tokenID);
        transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = Listing(price, msg.sender);
        emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
    }

    // Buy a NFT
    function buyNFT(uint256 tokenID) public payable {
        Listing memory listing = _listings[tokenID];
        require(listing.price > 0, "MarketPlace : NFT not listed for sale");
        require(msg.value == listing.price, "MarketPlace : Incorrect amount");
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        payable(listing.seller).transfer(Math.mulDiv(listing.price, 95, 100));
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    // CancelListing
    function cancelListing(uint256 tokenID) public {
        Listing memory listing = _listings[tokenID];
        require(listing.price > 0, "MarketPlace : NFT not listed for sale");
        require(
            listing.seller == msg.sender,
            "MarketPlace : Listing not created by you"
        );
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "MarketPlace : Insufficient Funds");
        payable(owner()).transfer(balance);
    }
}
