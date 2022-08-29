// SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;
import "@openzeppelin/contracts/access/Ownable.sol";

contract Miner is Ownable {
  uint256 private gridPower;
  uint256 private returnsIndex;

  uint256 private buyDampener;
  uint256 private sellDampener;
  uint256 private compoundDampener;

  uint256 private compoundCooldown;
  uint256 private baseCompoundBonus;
  uint256 private maxCompoundBonus;

  uint256 private compoundBonusThreshold;
  uint256 private minCompoundsThreshold;
  uint256 private allowanceThreshold;

  uint256 private baseAbuseFee;
  uint256 private dumpAbuseFee;
  uint256 private dumpAbusePenalty;
  uint256 private spamAbuseFee;
  uint256 private spamAbusePenalty;

  uint256 private referralReward;

  uint256 private gridFee;
  uint256 private maxGridFee;

  bool private minerInitialized;
  bool private solarGuardActivated;

  address payable private gridTechnician;

  mapping(address => UserData) private users;
  mapping(address => bool) private botUsers;

  struct UserData {
    uint256 solarPanels;
    uint256 storedPower;
    uint256 allowance;
    uint256 freshValue;
    uint256 amountSold;
    uint256 amountDeposited;
    uint256 sellsCount;
    uint256 totalCompoundsCount;
    uint256 currentCompoundsCount;
    uint256 lastSellTimestamp;
    uint256 lastCompoundTimestamp;
    uint256 lastActionTimestamp;
    uint256 compoundBonusTier;
    address referrer;
    address[] referees;
  }

  uint256 private shootingStarTimestamp;
  uint256 private shootingStarAbusePenalty;
  uint256 private shootingStarAmplifier;

  event MinerActivated(uint256 timestamp);
  event ShootingStar(uint256 amplifier, uint256 timestamp);
  event DumpPenaltyChanged(uint256 penalty, uint256 timestamp);
  event SpamPenaltyChanged(uint256 penalty, uint256 timestamp);
  event BuyDampenerChanged(uint256 dampener, uint256 timestamp);
  event SellDampenerChanged(uint256 dampener, uint256 timestamp);
  event CompoundDampenerChanged(uint256 dampener, uint256 timestamp);
  event GridFeeChanged(uint256 fee, uint256 timestamp);
  event PanelsPurchased(uint256 amount, uint256 timestamp);
  event PowerSold(uint256 amount, uint256 timestamp);

  constructor(address payable technicianAddress) {
    gridPower = 108000000000;
    returnsIndex = 604800;

    buyDampener = 100;
    sellDampener = 500;
    compoundDampener = 200;

    compoundCooldown = 5400;
    baseCompoundBonus = 15;
    maxCompoundBonus = 150;

    compoundBonusThreshold = 3;
    minCompoundsThreshold = 15;
    allowanceThreshold = 5;

    baseAbuseFee = 500;
    dumpAbuseFee = 500;
    dumpAbusePenalty = 100;
    spamAbuseFee = 750;
    spamAbusePenalty = 50;

    referralReward = 100;

    gridFee = 60;
    maxGridFee = 100;

    minerInitialized = false;
    solarGuardActivated = false;

    gridTechnician = technicianAddress;
  }

  function getTotalValueLocked() public view returns (uint256) {
    return address(this).balance;
  }

  function getSolarPanels(address user) public view returns (uint256) {
    return users[user].solarPanels;
  }

  function getRemainingAllowance(address user) public view returns (uint256) {
    return users[user].allowance;
  }

  function getFreshValue(address user) public view returns (uint256) {
    return users[user].freshValue;
  }

  function getAmountSold(address user) public view returns (uint256) {
    return users[user].amountSold;
  }

  function getAmountDeposited(address user) public view returns (uint256) {
    return users[user].amountDeposited;
  }

  function getSellsCount(address user) public view returns (uint256) {
    return users[user].sellsCount;
  }

  function getTotalCompoundsCount(address user) public view returns (uint256) {
    return users[user].totalCompoundsCount;
  }

  function getCurrentCompoundsCount(address user) public view returns (uint256) {
    return users[user].currentCompoundsCount;
  }

  function getLastSellTimestamp(address user) public view returns (uint256) {
    return users[user].lastSellTimestamp;
  }

  function getLastCompoundTimestamp(address user) public view returns (uint256) {
    return users[user].lastCompoundTimestamp;
  }

  function getCompoundBonusTier(address user) public view returns (uint256) {
    return users[user].compoundBonusTier;
  }

  function getReferrer(address user) public view returns (address) {
    return users[user].referrer;
  }

  function getReferees(address user) public view returns (address[] memory) {
    return users[user].referees;
  }

  function getBotStatus(address user) public view returns (bool) {
    return botUsers[user];
  }

  function getShootingStarStatus() public view returns (bool) {
    if (block.timestamp > shootingStarTimestamp)
      if (block.timestamp - shootingStarTimestamp <= 86400) return true;

    return false;
  }

  function checkStarAbuseStatus() public view returns (bool) {
    if (block.timestamp > shootingStarTimestamp) {
      if (block.timestamp - shootingStarTimestamp <= 172800) return true;
    } else if (shootingStarTimestamp - block.timestamp <= 86400) return true;

    return false;
  }

  function checkBaseAbuseStatus(address user, uint256 amount) public view returns (bool) {
    if (amount >= users[user].allowance) return true;
    return false;
  }

  function checkDumpAbuseStatus(address user, uint256 amount) public view returns (bool) {
    if (amount >= users[user].freshValue) return true;
    return false;
  }

  function checkSpamAbuseStatus(address user) public view returns (bool) {
    if (users[user].currentCompoundsCount < minCompoundsThreshold) return true;
    return false;
  }

  function checkRewardsBalance(address user) public view returns (uint256) {
    return computeSellTrade(checkPowerTotal(user));
  }

  function checkPowerTotal(address user) public view returns (uint256) {
    return users[user].storedPower + checkFreshPower(user);
  }

  function checkFreshPower(address user) public view returns (uint256) {
    uint256 sessionDuration = checkMinimum(86400, block.timestamp - users[user].lastActionTimestamp);

    return sessionDuration * users[user].solarPanels;
  }

  function checkMinimum(uint256 a, uint256 b) private pure returns (uint256) {
    return a < b ? a : b;
  }

  function computeFraction(uint256 amount, uint256 numerator) private pure returns (uint256) {
    return (amount * numerator) / 1000;
  }

  function computeTrade(
    uint256 a,
    uint256 b,
    uint256 c
  ) private view returns (uint256) {
    return computeFraction((a * b) / c, 1000 - gridFee);
  }

  function computeBuyTrade(uint256 amount) private view returns (uint256) {
    uint256 balance = address(this).balance - amount;

    return computeTrade(gridPower, amount, balance);
  }

  function computeSellTrade(uint256 amount) private view returns (uint256) {
    return computeTrade(address(this).balance, amount, gridPower);
  }

  function computeSimulatedBuy(uint256 amount) public view returns (uint256) {
    return computeTrade(gridPower, amount, address(this).balance);
  }

  function computeSimulatedSell(uint256 amount) public view returns (uint256) {
    return computeSellTrade(amount);
  }

  function setDumpAbusePenalty(uint256 penalty) external onlyOwner {
    require(penalty <= 500, "SolarGuard: Penalty value exceeds 50%!");

    dumpAbusePenalty = penalty;
    emit DumpPenaltyChanged(penalty, block.timestamp);
  }

  function setSpamAbusePenalty(uint256 penalty) external onlyOwner {
    require(penalty <= 500, "SolarGuard: Penalty value exceeds 50%!");

    spamAbusePenalty = penalty;
    emit SpamPenaltyChanged(penalty, block.timestamp);
  }

  function setBuyDampener(uint256 dampener) external onlyOwner {
    require(dampener <= 1000, "SolarGuard: Dampener value exceeds 100%!");

    buyDampener = dampener;
    emit BuyDampenerChanged(dampener, block.timestamp);
  }

  function setSellDampener(uint256 dampener) external onlyOwner {
    require(dampener <= 1000, "SolarGuard: Dampener value exceeds 100%!");

    sellDampener = dampener;
    emit SellDampenerChanged(dampener, block.timestamp);
  }

  function setCompoundDampener(uint256 dampener) external onlyOwner {
    require(dampener <= 1000, "SolarGuard: Dampener value exceeds 100%!");

    compoundDampener = dampener;
    emit CompoundDampenerChanged(dampener, block.timestamp);
  }

  function setGridFee(uint256 fee) external onlyOwner {
    require(fee <= maxGridFee, "SolarGuard: Fee provided is above max fee!");

    gridFee = fee;
    emit GridFeeChanged(fee, block.timestamp);
  }

  function buyPanels(address referrer) external payable {
    require(minerInitialized, "SolarGuard: Miner has not yet been activated!");

    if (solarGuardActivated) botUsers[msg.sender] = true;
    else {
      require(!botUsers[msg.sender], "SolarGuard: You are a contract abuser!");

      UserData storage user = users[msg.sender];

      if (user.referrer == address(0))
        if (referrer == msg.sender) user.referrer = address(0);
        else {
          user.referrer = referrer;
          users[referrer].referees.push(msg.sender);
        }

      user.amountDeposited += msg.value;

      uint256 newFreshValue = 0;

      if (user.amountSold < user.amountDeposited) newFreshValue = user.amountDeposited - user.amountSold;

      if (newFreshValue >= user.freshValue) {
        user.allowance = newFreshValue * allowanceThreshold;
        user.freshValue = newFreshValue;
      } else user.allowance += msg.value;

      uint256 powerAcquired = computeBuyTrade(msg.value);

      user.lastCompoundTimestamp = block.timestamp - compoundCooldown;

      if (block.timestamp > shootingStarTimestamp)
        if (block.timestamp - shootingStarTimestamp <= 86400)
          user.storedPower += computeFraction(powerAcquired, 1000 + shootingStarAmplifier);
        else user.storedPower += powerAcquired;
      else user.storedPower += powerAcquired;

      if (user.currentCompoundsCount > 0) {
        user.totalCompoundsCount--;
        user.currentCompoundsCount--;
      }

      uint256 referrerAmount = computeFraction(msg.value, referralReward);

      users[user.referrer].storedPower += computeFraction(powerAcquired, referralReward);
      users[user.referrer].allowance += referrerAmount;
      users[user.referrer].amountDeposited += referrerAmount;

      gridPower -= computeFraction(powerAcquired, buyDampener);
      gridTechnician.transfer(computeFraction(msg.value, gridFee));

      compoundPower();

      emit PanelsPurchased(msg.value, block.timestamp);
    }
  }

  function sellPower(uint256 amount) external {
    require(minerInitialized, "SolarGuard: Miner has not yet been activated!");
    require(!botUsers[msg.sender], "SolarGuard: You are a contract abuser!");

    UserData storage user = users[msg.sender];
    uint256 totalPower = checkPowerTotal(msg.sender);

    require(amount <= totalPower, "SolarGuard: Amount is greater than power held!");

    uint256 amountRequested = computeSellTrade(amount);
    uint256 gridReserve = (amountRequested / (1000 - gridFee)) * 1000;

    if (user.solarPanels == 0) amountRequested = computeFraction(amountRequested, baseAbuseFee);
    else {
      require(user.totalCompoundsCount >= minCompoundsThreshold, "SolarGuard: You have not met the compounds requirement!");

      if (block.timestamp > shootingStarTimestamp) {
        if (block.timestamp - shootingStarTimestamp <= 172800)
          user.solarPanels = computeFraction(user.solarPanels, 1000 - shootingStarAbusePenalty);
      } else if (shootingStarTimestamp - block.timestamp <= 86400)
        user.solarPanels = computeFraction(user.solarPanels, 1000 - shootingStarAbusePenalty);

      if (amountRequested >= user.allowance)
        if (user.allowance > 0) amountRequested = user.allowance + computeFraction(amountRequested - user.allowance, baseAbuseFee);
        else amountRequested = computeFraction(amountRequested, baseAbuseFee);

      if (amountRequested >= user.freshValue) {
        amountRequested = computeFraction(amountRequested, dumpAbuseFee);
        user.solarPanels = computeFraction(user.solarPanels, 1000 - dumpAbusePenalty);
      }

      if (user.currentCompoundsCount < minCompoundsThreshold) {
        amountRequested = computeFraction(amountRequested, 1000 - spamAbuseFee);
        user.solarPanels = computeFraction(user.solarPanels, 1000 - spamAbusePenalty);
      }

      user.compoundBonusTier = 0;
      user.currentCompoundsCount = 0;
    }

    user.storedPower = 0;

    if (amount < totalPower) user.storedPower = totalPower - amount;

    if (gridReserve < user.allowance) user.allowance -= gridReserve;
    else user.allowance = 0;

    user.lastSellTimestamp = block.timestamp;
    user.lastActionTimestamp = block.timestamp;

    user.sellsCount++;
    user.amountSold += gridReserve;

    gridPower += computeFraction(amount, sellDampener);
    gridTechnician.transfer(computeFraction(gridReserve, gridFee));
    payable(msg.sender).transfer(amountRequested);

    emit PowerSold(amountRequested, block.timestamp);
  }

  function compoundPower() public {
    require(minerInitialized, "SolarGuard: Miner has not yet been activated!");
    require(!botUsers[msg.sender], "SolarGuard: You are a contract abuser!");

    UserData storage user = users[msg.sender];

    require(block.timestamp - user.lastCompoundTimestamp >= compoundCooldown, "SolarGuard: You are on cooldown!");

    uint256 userPower = checkPowerTotal(msg.sender);
    uint256 minersAcquired = userPower / returnsIndex;

    user.storedPower = 0;
    user.lastCompoundTimestamp = block.timestamp;
    user.lastActionTimestamp = block.timestamp;

    user.totalCompoundsCount++;
    user.currentCompoundsCount++;

    if (user.currentCompoundsCount >= compoundBonusThreshold) {
      if (user.currentCompoundsCount / compoundBonusThreshold > user.compoundBonusTier)
        if (user.compoundBonusTier < maxCompoundBonus / baseCompoundBonus) user.compoundBonusTier++;
        else if (user.compoundBonusTier < (2 * maxCompoundBonus) / baseCompoundBonus)
          if (user.currentCompoundsCount >= 480 && user.compoundBonusTier < 20) user.compoundBonusTier += 8;
          else if (user.currentCompoundsCount >= 112 && user.compoundBonusTier < 12) user.compoundBonusTier += 2;

      minersAcquired += computeFraction(minersAcquired, user.compoundBonusTier * baseCompoundBonus);
    }

    user.solarPanels += minersAcquired;

    gridPower += computeFraction(userPower, compoundDampener);
  }

  function catchAbuser(address user) external onlyOwner {
    botUsers[user] = true;
  }

  function freeInnocent(address user) external onlyOwner {
    botUsers[user] = false;
  }

  function activateMiner() external payable onlyOwner {
    require(!minerInitialized, "SolarGuard: Miner can only be activated once!");

    minerInitialized = true;
    solarGuardActivated = true;

    emit MinerActivated(block.timestamp);
  }

  function releaseGuard() external onlyOwner {
    require(solarGuardActivated, "SolarGuard: Startup guard can only be deactivated once!");

    solarGuardActivated = false;
  }

  function shootingStar(uint256 amplifier, uint256 time) external onlyOwner {
    require(amplifier <= 500 && amplifier >= 100, "SolarGuard: Shooting Star value amplifier must be between 10% and 50%!");
    require(time >= block.timestamp, "SolarGuard: Shooting Star time cannot be in the past!");

    shootingStarAmplifier = amplifier;
    shootingStarTimestamp = time;

    emit ShootingStar(shootingStarAmplifier, shootingStarTimestamp);
  }

  receive() external payable {}
}
