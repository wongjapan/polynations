// SPDX-License-Identifier: MIT

pragma solidity 0.8.9;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PolynationMiner is Context, Ownable {
  using SafeMath for uint256;

  uint256 private hatchRate = 604800;
  uint256 private maxRate = 1080000;
  uint256 private minRate = 86400;

  uint256 private PSN = 10000;
  uint256 private PSNH = 5000;

  uint256 private maintenanceFee = 42;
  uint256 private maxFee = 100;

  bool private initialized = false;

  address payable private maintenanceFund;
  mapping(address => uint256) private hatcheryMiners;
  mapping(address => uint256) private claimedEggs;
  mapping(address => uint256) private lastHatch;
  mapping(address => address) private referrals;
  uint256 private marketEggs;

  event RateChanged(uint256 rate, uint256 timestamp);
  event FeeChanged(uint256 fee, uint256 timestamp);

  constructor(address payable maintenance) {
    maintenanceFund = payable(maintenance);
  }

  function seedMarket() public payable onlyOwner {
    require(marketEggs == 0);
    initialized = true;
    marketEggs = 108000000000;
  }

  function hatchEggs(address ref) public {
    require(initialized);

    if (ref == msg.sender) {
      ref = address(0);
    }

    if (referrals[msg.sender] == address(0) && referrals[msg.sender] != msg.sender) {
      referrals[msg.sender] = ref;
    }

    uint256 eggsUsed = getMyEggs(msg.sender);
    uint256 newMiners = SafeMath.div(eggsUsed, hatchRate);
    hatcheryMiners[msg.sender] = SafeMath.add(hatcheryMiners[msg.sender], newMiners);
    claimedEggs[msg.sender] = 0;
    lastHatch[msg.sender] = block.timestamp;

    claimedEggs[referrals[msg.sender]] = SafeMath.add(claimedEggs[referrals[msg.sender]], SafeMath.div(eggsUsed, 8));
    marketEggs = SafeMath.add(marketEggs, SafeMath.div(eggsUsed, 5));
  }

  function sellEggs() public {
    require(initialized);
    uint256 hasEggs = getMyEggs(msg.sender);
    uint256 eggValue = calculateEggSell(hasEggs);
    uint256 fee = devFee(eggValue);
    claimedEggs[msg.sender] = 0;
    lastHatch[msg.sender] = block.timestamp;
    marketEggs = SafeMath.add(marketEggs, hasEggs);
    maintenanceFund.transfer(fee);
    payable(msg.sender).transfer(SafeMath.sub(eggValue, fee));
  }

  function beanRewards(address adr) public view returns (uint256) {
    uint256 hasEggs = getMyEggs(adr);
    uint256 eggValue = calculateEggSell(hasEggs);
    return eggValue;
  }

  function buyEggs(address ref) public payable {
    require(initialized);
    uint256 eggsBought = calculateEggBuy(msg.value, SafeMath.sub(address(this).balance, msg.value));
    eggsBought = SafeMath.sub(eggsBought, devFee(eggsBought));
    uint256 fee = devFee(msg.value);
    maintenanceFund.transfer(fee);
    claimedEggs[msg.sender] = SafeMath.add(claimedEggs[msg.sender], eggsBought);
    hatchEggs(ref);
  }

  function calculateTrade(
    uint256 rt,
    uint256 rs,
    uint256 bs
  ) private view returns (uint256) {
    return
      SafeMath.div(
        SafeMath.mul(PSN, bs),
        SafeMath.add(PSNH, SafeMath.div(SafeMath.add(SafeMath.mul(PSN, rs), SafeMath.mul(PSNH, rt)), rt))
      );
  }

  function calculateEggSell(uint256 eggs) public view returns (uint256) {
    return calculateTrade(eggs, marketEggs, address(this).balance);
  }

  function calculateEggBuy(uint256 eth, uint256 contractBalance) public view returns (uint256) {
    return calculateTrade(eth, contractBalance, marketEggs);
  }

  function calculateEggBuySimple(uint256 eth) public view returns (uint256) {
    return calculateEggBuy(eth, address(this).balance);
  }

  function devFee(uint256 amount) private view returns (uint256) {
    return SafeMath.div(SafeMath.mul(amount, maintenanceFee), 1000);
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getMyMiners(address adr) public view returns (uint256) {
    return hatcheryMiners[adr];
  }

  function getMyEggs(address adr) public view returns (uint256) {
    return SafeMath.add(claimedEggs[adr], getEggsSinceLastHatch(adr));
  }

  function getEggsSinceLastHatch(address adr) public view returns (uint256) {
    uint256 secondsPassed = min(hatchRate, SafeMath.sub(block.timestamp, lastHatch[adr]));
    return SafeMath.mul(secondsPassed, hatcheryMiners[adr]);
  }

  function min(uint256 a, uint256 b) private pure returns (uint256) {
    return a < b ? a : b;
  }

  function setFee(uint256 fee) public onlyOwner {
    require(fee <= maxFee, "Fee provided is above max fee");
    maintenanceFee = fee;
    emit FeeChanged(fee, block.timestamp);
  }

  function setRate(uint256 rate) public onlyOwner {
    require(rate >= minRate, "Rate provided is beneath min rate");
    require(rate <= maxRate, "Rate provided is above max rate");
    hatchRate = rate;
    emit RateChanged(rate, block.timestamp);
  }
}
