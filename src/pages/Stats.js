import React from "react";
import MinerCard from "components/Card/MinerCard";
import BuildCard from "components/Card/BuildCard";
import ManageCard from "components/Card/ManageCard";
const Stats = () => {
  // const
  return (
    <div className="bgcl">
      <div className="card_shape">
        <MinerCard />
        <BuildCard />
        <ManageCard />
      </div>
    </div>
  );
};

export default Stats;
