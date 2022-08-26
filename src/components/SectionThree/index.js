import React from "react";

import Contents from "./Contents";

const SectionThree = () => {
  return (
    <div className="cds">
      <p className="parag">Explore endless possibilities with PolyNation</p>
      <div className="container-fluid d-flex justify-content-center">
        <div className="row">
          <div className="col-md-4">
            <Contents />
          </div>
          <div className="col-md-4">
            <Contents />
          </div>
          <div className="col-md-4">
            <Contents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionThree;
