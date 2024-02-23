const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFTMarket", function () {
  async function deployContract() {
    const [owner] = await ethers.getSigners();
    const nftMarket = await ethers.deployContract("MarketPlace", [owner.address]);
    return nftMarket;
  };


  it("Test Creating NFTs", async () => {
    const nftMarket = await loadFixture(deployContract);
    const [owner, otherAccount] = await ethers.getSigners();
    await nftMarket.createToken("https://some-token.uri/");
    await expect(nftMarket.listNFT(0,0)).to.be.revertedWith("Price must be greater than 0");
  })

  it("Listing NFTs", async ()=>{
    const nftMarket = await loadFixture(deployContract);
    const [owner, otherAccount] = await ethers.getSigners();
    await nftMarket.createToken("https://some-token.uri/");
    console.log(`Original owner : ${await nftMarket.ownerOf(0)}`);
    await nftMarket.listNFT(0,2);
    console.log(`After listing owner : ${await nftMarket.ownerOf(0)}`);
    await nftMarket.connect(otherAccount).buyNFT(0, {value : 2});
    console.log(`After buying owner : ${await nftMarket.ownerOf(0)}`);
    await address(nftMarket.getAddress()).balance();
  })
});