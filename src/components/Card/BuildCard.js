import React from "react";
import polyStatus from "assets/images/poly_status.png";
import { Placeholder } from "react-bootstrap";
import { useEtherBalance, useEthers } from "@usedapp/core";

import "./style.scss";
import useHiveBuilt from "hooks/useHiveBuilt";
import { getNumber } from "utils/helpers";
import useNectarReward from "hooks/useNectarReward";
const BuildCard = () => {
  const { account } = useEthers();
  const hivesBuilt = useHiveBuilt(account);
  const nectarReward = useNectarReward(account);
  const walletBalance = useEtherBalance(account);
  return (
    <div className="card text-center">
      <div className="card-body text-dark">
        <h4 className="card-title_sec">Build Apiary</h4>
        <span className="sub-card-title">Develop your PolyNation</span>
        <div className="container">
          <div className="d-flex justify-content-between dashboard-card">
            <div>
              Hives Built <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              {!hivesBuilt && (
                <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
              )}
              {hivesBuilt && <div className="clr-yellow fw-bold"> {getNumber(hivesBuilt)} Hives</div>}
            </div>
          </div>
          <div className="d-flex justify-content-between dashboard-card">
            <div>
              Hive Price <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
            </div>
          </div>
          <div className="d-flex justify-content-between dashboard-card">
            <div>
              Nectar Gathered <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
            </div>
          </div>
          <div className="d-flex justify-content-between dashboard-card mt-3">
            <div>
              Honey Produced <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
            </div>
          </div>
          <div className="d-flex justify-content-between dashboard-card">
            <div>
              Wallet Balance <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
            </div>
          </div>
        </div>
      </div>
      <div className="edit_cur">
        <span className="btn_edit">
          <button>Please Connect Your Wallet</button>
        </span>
      </div>
    </div>
  );
};

export default BuildCard;
