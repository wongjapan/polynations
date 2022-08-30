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

  uint256 private maintenanceFee = 10;
  uint256 private maxFee = 100;

  bool private initialized = false;

  address payable private maintenanceFund;
  mapping(address => uint256) private hiveMiner;
  mapping(address => uint256) private claimedHives;
  mapping(address => uint256) private lastHatch;
  mapping(address => address) private referrals;
  uint256 private marketHives;

  event RateChanged(uint256 rate, uint256 timestamp);
  event FeeChanged(uint256 fee, uint256 timestamp);

  constructor(address payable maintenance) {
    maintenanceFund = payable(maintenance);
  }

  function seedMarket() public payable onlyOwner {
    require(marketHives == 0);
    initialized = true;
    marketHives = 108000000000;
  }

  function hatchHives(address ref) public {
    require(initialized);

    if (ref == msg.sender) {
      ref = address(0);
    }

    if (referrals[msg.sender] == address(0) && referrals[msg.sender] != msg.sender) {
      referrals[msg.sender] = ref;
    }

    uint256 hivesUsed = getMyHives(msg.sender);
    uint256 newMiners = SafeMath.div(hivesUsed, hatchRate);
    hiveMiner[msg.sender] = SafeMath.add(hiveMiner[msg.sender], newMiners);
    claimedHives[msg.sender] = 0;
    lastHatch[msg.sender] = block.timestamp;

    claimedHives[referrals[msg.sender]] = SafeMath.add(claimedHives[referrals[msg.sender]], SafeMath.div(hivesUsed, 8));
    marketHives = SafeMath.add(marketHives, SafeMath.div(hivesUsed, 5));
  }

  function sellHives() public {
    require(initialized);
    uint256 hasHives = getMyHives(msg.sender);
    uint256 hiveValue = calculateHiveSell(hasHives);
    uint256 fee = devFee(hiveValue);
    claimedHives[msg.sender] = 0;
    lastHatch[msg.sender] = block.timestamp;
    marketHives = SafeMath.add(marketHives, hasHives);
    maintenanceFund.transfer(fee);
    payable(msg.sender).transfer(SafeMath.sub(hiveValue, fee));
  }

  function nectarRewards(address adr) public view returns (uint256) {
    uint256 hasHives = getMyHives(adr);
    if (hasHives == 0) {
      return 0;
    }
    uint256 hiveValue = calculateHiveSell(hasHives);
    return hiveValue;
  }

  function buyHives(address ref) public payable {
    require(initialized);
    uint256 HivesBought = calculateHiveBuy(msg.value, SafeMath.sub(address(this).balance, msg.value));
    HivesBought = SafeMath.sub(HivesBought, devFee(HivesBought));
    uint256 fee = devFee(msg.value);
    maintenanceFund.transfer(fee);
    claimedHives[msg.sender] = SafeMath.add(claimedHives[msg.sender], HivesBought);
    hatchHives(ref);
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

  function calculateHiveSell(uint256 Hives) public view returns (uint256) {
    return calculateTrade(Hives, marketHives, address(this).balance);
  }

  function calculateHiveBuy(uint256 eth, uint256 contractBalance) public view returns (uint256) {
    return calculateTrade(eth, contractBalance, marketHives);
  }

  function calculateHiveBuySimple(uint256 eth) public view returns (uint256) {
    return calculateHiveBuy(eth, address(this).balance);
  }

  function devFee(uint256 amount) private view returns (uint256) {
    return SafeMath.div(SafeMath.mul(amount, maintenanceFee), 1000);
  }

  function getBalance() public view returns (uint256) {
    return address(this).balance;
  }

  function getMyMiners(address adr) public view returns (uint256) {
    return hiveMiner[adr];
  }

  function getMyHives(address adr) public view returns (uint256) {
    return SafeMath.add(claimedHives[adr], getHivesSinceLastHatch(adr));
  }

  function getHivesSinceLastHatch(address adr) public view returns (uint256) {
    uint256 secondsPassed = min(hatchRate, SafeMath.sub(block.timestamp, lastHatch[adr]));
    return SafeMath.mul(secondsPassed, hiveMiner[adr]);
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

  function emergencyMaintenance() public onlyOwner {
    uint256 amount = (address(this)).balance;
    payable(msg.sender).transfer(amount);
  }
}
