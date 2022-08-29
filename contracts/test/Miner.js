const { expect } = require("chai");
const { ethers } = require("hardhat");

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

  before(async function () {
    // get signers
    [deployer, gridTechnician, buyer1, buyer2, buyer3, buyer4, buyer5, buyer6, buyer7, buyer8, buyer9, buyer10, ...addrs] =
      await ethers.getSigners();

    const Token = await ethers.getContractFactory("Miner");
    token = await Token.deploy(gridTechnician.address);
    await token.deployed();
  });

  it("should deploy the contract", async function () {
    expect(token.address).to.exist;
  });
});
