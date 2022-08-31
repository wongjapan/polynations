import React from "react";
import { useEthers } from "@usedapp/core";

import polynationlogo from "./images/polynationlogo.png";

const ConnectButtonModal = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  if (account) {
    return (
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
      <div className="cont connect-btn" onClick={deactivate}>
        <p className="para sec1">{account.substring(0, 8)}... </p>
        <p className="img_bor">
          <img src={polynationlogo} alt="" />
        </p>
      </div>
    );
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="cont connect-btn" onClick={() => activateBrowserWallet()}>
      <p className="para sec1">Connect</p>
      <p className="img_bor">
        <img src={polynationlogo} alt="" />
      </p>
    </div>
  );
};

export { ConnectButtonModal };
