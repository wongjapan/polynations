import config from "constants/config";
import { Contract, BigNumber } from "ethers";
import ERC20Interface from "constants/MinerAbi.json";

const { useCall } = require("@usedapp/core");

function useRate() {
  const ONE_ETH = BigNumber.from("1000000000000000000");
  const { value, error } =
    useCall(
      config.CONTRACT_ADDRESS && {
        contract: new Contract(config.CONTRACT_ADDRESS, ERC20Interface),
        method: "calculateHiveBuySimple",
        args: [ONE_ETH]
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
}

export default useRate;
