import React from "react";
import "./style.scss";
import banner from "./images/banner.png";

const Contents = () => {
  return (
    <>
      <div className="cur">
        <div className="card text-center">
          <div className="overflow">
            <img src={banner} alt="" className="card-img-top" />
          </div>
          <div className="card-body text-dark">
            <h4 className="card-title">Drive into the world of NFT</h4>
            <p className="card-text text-secondary">Open Rare Mystery Boxes, Explore IGOs, Fan tokens and More with PolyNation.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contents;
