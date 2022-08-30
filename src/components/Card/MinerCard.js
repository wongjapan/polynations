import React from "react";
import polyStatus from "assets/images/poly_status.png";
import { useEtherBalance } from "@usedapp/core";

import { utils } from "ethers";

import config from "constants/config";
import { Placeholder } from "react-bootstrap";

const MinerCard = () => {
  const contractBalance = useEtherBalance(config.CONTRACT_ADDRESS);

  return (
    <div className="card text-center">
      <div className="card-body text-dark">
        <h4 className="card-title">PolyNation Miner Stats</h4>
        <span className="sub-card-title">View Live PolyNation Data</span>
        <div className="container">
          <div className="d-flex justify-content-between dashboard-card">
            <div>
              Poly Status <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div>
              <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
            </div>
          </div>

          <div className="d-flex justify-content-between dashboard-card">
            <div>Total Value Locked</div>
            <div>
              <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
            </div>
          </div>

          <div className="d-flex justify-content-between dashboard-card">
            <div>Estimated Rate</div>
            <div>
              <Placeholder className="box-placeholder" style={{ minWidth: "125px" }} bg="secondary" as="div" animation="wave" />
            </div>
          </div>

          <div className="d-flex justify-content-between dashboard-card mt-3">
            <div>
              Daily ROI <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
            <div className="clr-yellow fw-bold">14.8%</div>
          </div>

          <div className="d-flex justify-content-between dashboard-card">
            <div>Yearly ROI</div>
            <div className="clr-yellow fw-bold">14.8%</div>
          </div>

          <div className="d-flex justify-content-between dashboard-card">
            <div>Maintenance Fee</div>
            <div className="clr-yellow fw-bold">1%</div>
          </div>

          <div className="d-flex justify-content-between dashboard-card mt-3">
            <div className="fst-italic ">
              Compunding Statistics <img alt="iimage" src={polyStatus} className="poly-info" />
            </div>
          </div>

          <div className="d-flex justify-content-between dashboard-card ">
            <div>Twice Per Day</div>
            <div className="clr-yellow fw-bold">37.25% Daily ROI</div>
          </div>

          <div className="d-flex justify-content-between dashboard-card ">
            <div>Once Per Day</div>
            <div className="clr-yellow fw-bold">37.25% Daily ROI</div>
          </div>

          <div className="d-flex justify-content-between dashboard-card ">
            <div>Once Per Week</div>
            <div className="clr-yellow fw-bold">37.25% Daily ROI</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinerCard;
