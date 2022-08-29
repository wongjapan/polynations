const { expect } = require("chai");
const { ethers } = require("hardhat");
const provider = ethers.provider;

const formatEther = ethers.utils.formatEther;
const parseEther = ethers.utils.parseEther;

describe("Miner Test", function () {
  let deployer;
  let gridTechnician;
  let buyer1;
  let buyer2;
  let buyer3;
  let buyer4;
  let buyer5;
  let buyer6;
  let buyer7;
  let buyer8;
  let buyer9;
  let buyer10;
  let addrs;

  let token;
  before(async function () {
    // get signers
    [deployer, gridTechnician, buyer1, buyer2, buyer3, buyer4, buyer5, buyer6, buyer7, buyer8, buyer9, buyer10, ...addrs] =
      await ethers.getSigners();

    const Token = await ethers.getContractFactory("Miner");
    token = await Token.deploy(gridTechnician.address);
    await token.deployed();
    token.activateMiner();
  });

  it("should deploy the contract", async function () {
    expect(token.address).to.exist;
  });

  it("should have the correct owner", async function () {
    const owner = await token.owner();
    expect(owner).to.equal(deployer.address);
  });

  it("allow buyer to buy panel", async function () {
    // console.log(buyer1);
    const balanceBefore = await provider.getBalance(token.address);
    const buyer1BalanceBefore = await provider.getBalance(buyer1.address);
    await token.connect(buyer1).buyPanels(deployer.address, { value: ethers.utils.parseEther("1") });
    const buyer1Balance = await provider.getBalance(buyer1.address);
    const balance = await provider.getBalance(token.address);
    console.log("token balance before :", formatEther(balanceBefore.toString()));
    console.log("token balance :", formatEther(balance.toString()));
    console.log("buyer 1 balance before :", formatEther(buyer1BalanceBefore.toString()));
    console.log("buyer 1 balance :", formatEther(buyer1Balance.toString()));
    // expect(balance).to.equal(ethers.utils.parseEther("1"));
  });
});
