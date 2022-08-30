import config from "constants/config";
import { Contract } from "ethers";
import ERC20Interface from "constants/MinerAbi.json";

const { useCall } = require("@usedapp/core");

function useHiveBuilt(addr) {
  const { value, error } =
    useCall(
      config.CONTRACT_ADDRESS && {
        contract: new Contract(config.CONTRACT_ADDRESS, ERC20Interface),
        method: "getMyHives",
        args: [addr]
      }
    ) ?? {};
  if (error) {
    return undefined;
  }
  return value?.[0];
}

export default useHiveBuilt;
