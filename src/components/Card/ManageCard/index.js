import React from "react";
import polyStatus from "assets/images/poly_status.png";
import { useEthers } from "@usedapp/core";

import { Placeholder } from "react-bootstrap";
import Logged from "./Logged";
import "../style.scss";

const ManageCard = () => {
  const { account } = useEthers();

  //   const
  return account ? (
    <Logged />
  ) : (
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
              <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
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
              Sweet Gold / PolyMatic <img alt="iimage" src={polyStatus} className="poly-info" />
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

export default ManageCard;
