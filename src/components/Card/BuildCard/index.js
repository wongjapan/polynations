import React from "react";
import { useEthers } from "@usedapp/core";

import "../style.scss";
import Logged from "./Logged";
import NotLogged from "./NotLogged";

const BuildCard = () => {
  const { account } = useEthers();

  return account ? <Logged /> : <NotLogged />;
};

export default BuildCard;
