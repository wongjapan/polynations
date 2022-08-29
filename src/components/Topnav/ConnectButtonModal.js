import { useEthers } from "@usedapp/core";
import React from "react";

import polynationlogo from "./images/polynationlogo.png";

const ConnectButtonModal = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  if (account) {
    return (
      <div className="cont connect-btn" onClick={deactivate}>
        <p className="para sec1">{account.substring(0, 8)}... </p>
        <p className="img_bor">
          <img src={polynationlogo} alt="" />
        </p>
      </div>
    );
  }

  return (
    <div className="cont connect-btn" onClick={() => activateBrowserWallet()}>
      <p className="para sec1">Connect</p>
      <p className="img_bor">
        <img src={polynationlogo} alt="" />
      </p>
    </div>
  );
};

export { ConnectButtonModal };
