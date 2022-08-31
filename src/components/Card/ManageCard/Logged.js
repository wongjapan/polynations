import React, { useState, useRef } from "react";
import polyStatus from "assets/images/poly_status.png";
import { Placeholder } from "react-bootstrap";
import { useContractFunction, useEtherBalance, useEthers } from "@usedapp/core";
import { Store } from "react-notifications-component";

import { formatEther, parseEther } from "ethers/lib/utils";
import { utils } from "ethers";
import { Contract } from "@ethersproject/contracts";

import config from "constants/config";
import MinerAbi from "constants/MinerAbi";

import { useLocation } from "react-router";
import queryString from "query-string";

import "../style.scss";
import useHiveBuilt from "hooks/useHiveBuilt";
import { formatNumber, nFormatter } from "utils/helpers";
import useNectarReward from "hooks/useNectarReward";
import useMiner from "hooks/useMiner";
import useRate from "hooks/useRate";
import { RbaChain } from "constants/RbaChain";

const Logged = () => {
  const { account, switchNetwork, chainId, library } = useEthers();
  const hivesBuilt = useHiveBuilt(account);
  const nectarReward = useNectarReward(account);
  const accountMiner = useMiner(account);
  const walletBalance = useEtherBalance(account);
  const hiveRate = useRate();

  const contract = new Contract(config.CONTRACT_ADDRESS, MinerAbi, library.getSigner());
  const location = useLocation();
  const reffAddr = queryString.parse(location.search)?.ref;
  const refferalAddress = utils.isAddress(reffAddr) ? reffAddr : "0x0000000000000000000000000000000000000000";

  function handleCompound() {
    if (chainId !== RbaChain.chainId) {
      switchNetwork(RbaChain.chainId);
    }
    if (nectarReward < 1) {
      Store.addNotification({
        title: "Error",
        message: "You dont have reward to compound.",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    } else {
      contract.hatchHives(refferalAddress);
    }
  }

  function handleSell() {
    if (chainId !== RbaChain.chainId) {
      switchNetwork(RbaChain.chainId);
    }
    if (nectarReward < 1) {
      Store.addNotification({
        title: "Error",
        message: "You dont have reward to sell.",
        type: "danger",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    } else {
      contract.sellHives();
    }
  }

  return (
    <div className="card text-center">
      <div className="card-body text-dark">
        <h4 className="card-title_sec">Bee Keeping</h4>
        <span className="sub-card-title">Manage your PolyNation</span>
        <div className="container">
          <div className="d-flex justify-content-between dashboard-card">
            <div>
              Hives Built <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              {!hivesBuilt && (
                <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
              )}
              {hivesBuilt && <div className="clr-yellow fw-bold"> {nFormatter(hivesBuilt)} Hives</div>}
            </div>
          </div>
          <div className="d-flex justify-content-between dashboard-card">
            <div>
              Hive Value <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              {!hivesBuilt && (
                <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
              )}
              {hivesBuilt && <div className="clr-yellow fw-bold"> {formatNumber(formatEther(hivesBuilt.mul(hiveRate)) * 1)} Matic</div>}
            </div>
          </div>
          <div className="d-flex justify-content-between dashboard-card">
            <div>
              Nectar Gathered <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              {!accountMiner && (
                <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
              )}
              {accountMiner && <div className="clr-yellow fw-bold"> {nFormatter(accountMiner * 86400)} Hives</div>}
            </div>
          </div>
          <div className="d-flex justify-content-between dashboard-card mt-3">
            <div>
              Honey Produced <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              {!accountMiner && (
                <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
              )}
              {accountMiner && <div className="clr-yellow fw-bold"> {nFormatter(accountMiner)} Hives</div>}
            </div>
          </div>
          <div className="d-flex justify-content-between dashboard-card mt-3">
            <div>
              Reward Balance <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              {!nectarReward && (
                <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
              )}
              {nectarReward && <div className="clr-yellow fw-bold"> {formatNumber(formatEther(nectarReward) * 1)} Matic</div>}
            </div>
          </div>
        </div>
      </div>

      <div className="edit_cur pd">
        <span className="btn_edit_page_1">
          <button onClick={handleCompound}>Compound</button>
        </span>
        <span className="btn_edit_page_2">
          <button onClick={handleSell}>Sell Rewards</button>
        </span>
      </div>
    </div>
  );
};

export default Logged;
