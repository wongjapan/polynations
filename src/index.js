import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ReactNotifications } from "react-notifications-component";

import "./assets/scss/main.scss";
import "react-notifications-component/dist/theme.css";

import { RbaChain } from "constants/RbaChain";

import { DAppProvider, DEFAULT_SUPPORTED_CHAINS } from "@usedapp/core";
const config = {
  readOnlyChainId: RbaChain.chainId,
  readOnlyUrls: {
    [RbaChain.chainId]: "https://preseed-testnet-1.roburna.com/"
  },
  networks: [...DEFAULT_SUPPORTED_CHAINS, RbaChain]
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <ReactNotifications />
      <App />
    </DAppProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
