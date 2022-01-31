const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CryptoLucha", function () {

  let Contract;
  let contract;
  let owner;
  let addr1;

  beforeEach(async function(){
    [owner, addr1] = await ethers.getSigners();
    Contract = await ethers.getContractFactory("CryptoLucha");
    contract = await Contract.deploy();
  })

  describe("Mint",function(){

    it("Should Mint 1 NFT", async function () {
      const mintTx = await contract.connect(addr1).mintNFTs(1,{value:ethers.utils.parseEther('0.3')});
      await mintTx.wait();
      expect(await contract.balanceOf(addr1.address)).to.equal(1);
    });

    it("Should return an array of 2 ids", async function () {
      let mintTx = await contract.connect(addr1).mintNFTs(2,{value:ethers.utils.parseEther('0.3')});
      await mintTx.wait();
      expect(await contract.balanceOf(addr1.address)).to.equal(2);
    });

    it("Limit mints NFT per transaccion", async function () {
      await expect(contract.mintNFTs(6,{value:ethers.utils.parseEther('0.3')})).to.be.revertedWith("Cannot mint specified number of NFTs.");
    });

    it("Not enough ether", async function () {
      await expect(contract.mintNFTs(1)).to.be.revertedWith("Not enough ether to purchase NFTs.");
    });

    it("Max supply", async function () {
      let mintTx = await contract.connect(addr1).mintNFTs(4,{value:ethers.utils.parseEther('5')});
      await mintTx.wait();
      mintTx = await contract.connect(addr1).mintNFTs(4,{value:ethers.utils.parseEther('5')});
      await mintTx.wait();
      await expect(contract.mintNFTs(5,{value:ethers.utils.parseEther('5')})).to.be.revertedWith("Not enough NFTs!");
    });
  })

});
