import React from "react";

const Stats = () => {
  return (
    <div className="bgcl">
      <div className="card_shape">
        <div className="card text-center">
          <div className="card-body text-dark">
            <h4 className="card-title">PolyNation Miner Stats</h4>
            <span className="sub-card-title">View Live PolyNation Data</span>
            <div className="container">
              <div className="table_block">
                <div className="section_one_left">
                  <ul>
                    <li className="first">
                      Poly Status <img src="./img/poly_status.png" className="poly" />
                    </li>
                    <li className="first">Total Value Locked</li>
                    <li className="first">Estimated Rate</li>
                  </ul>
                </div>
                <div className="section_one_right">
                  <ul>
                    <li>
                      <span className="normal">Normal</span>
                    </li>
                    <li className="first">611.044 Polymatic</li>
                    <li className="first">1170.069B Hives/Polymatic</li>
                  </ul>
                </div>
              </div>
              <div className="table_block">
                <div>
                  <div className="section_one_left">
                    <ul>
                      <li className="first">
                        Daily ROI
                        <img src="./img/poly_status.png" className="poly" />
                      </li>
                      <li className="first">Yearly ROI</li>
                      <li className="first">Yearly ROI</li>
                    </ul>
                  </div>
                  <div className="section_one_right">
                    <ul>
                      <li className="first">14.28%</li>
                      <li className="first">5124.18% </li>
                      <li className="first">10%</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="table_block">
                <span className="heading">
                  Compunding Statistics
                  <img src="./img/poly_status.png" className="poly" />
                </span>
                <div className="section_one_left">
                  <ul>
                    <li className="first">Twice Per Day</li>
                    <li className="first">Once Per Day</li>
                    <li className="first">Twice Per Week</li>
                  </ul>
                </div>
                <div className="section_one_right">
                  <ul>
                    <li className="first">37.25% Daily ROI</li>
                    <li className="first">37.25% Daily ROI</li>
                    <li className="first">37.25% Daily ROI</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* -------------------------------------- */}
        <div className="card text-center">
          <div className="card-body text-dark">
            <h4 className="card-title_sec">Build Apiary</h4>
            <span className="sub-card-title">Develop your PolyNation</span>
            <div className="container">
              <div>
                <div className="section_one_left">
                  <ul>
                    <li className="first">
                      Hives Built
                      <img src="./img/poly_status.png" className="poly" />
                    </li>
                    <li className="first">
                      Hive Price
                      <img src="./img/poly_status.png" className="poly" />
                    </li>
                    <li className="first bottom-space">
                      Nectar Gathered
                      <img src="./img/poly_status.png" className="poly" />
                    </li>
                    <li className="first ">Nectar Gathered</li>
                    <li className="first">Nectar Gathered</li>
                  </ul>
                </div>
                <div className="section_one_right">
                  <ul>
                    <li>
                      <input type="text" class="box"></input>
                    </li>
                    <li>
                      <input type="text" class="box"></input>
                    </li>
                    <li className="bottom-space">
                      <input type="text " class="box"></input>
                    </li>
                    <li>
                      <input type="text" class="box"></input>
                    </li>
                    <li>
                      <input type="text" class="box"></input>
                    </li>
                  </ul>
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
        {/* ----------------------------- */}

        <div className="card text-center">
          <div className="card-body text-dark">
            <h4 className="card-title_sec">Build Apiary</h4>
            <span className="sub-card-title">Develop your PolyNation</span>
            <div className="container">
              <div>
                <div className="section_one_left">
                  <ul>
                    <li className="first">
                      Hives Built
                      <img src="./img/poly_status.png" className="poly" />
                    </li>
                    <li className="first">
                      Hive Price
                      <img src="./img/poly_status.png" className="poly" />
                    </li>
                    <li className="first bottom-space">
                      Nectar Gathered
                      <img src="./img/poly_status.png" className="poly" />
                    </li>

                    <li className="first  ">Nectar Gathered</li>
                    <li className="first">Nectar Gathered</li>
                  </ul>
                </div>
                <div className="section_one_right">
                  <ul>
                    <li>
                      <input type="text" class="box"></input>
                    </li>
                    <li>
                      <input type="text" class="box"></input>
                    </li>
                    <li className="bottom-space">
                      <input type="text" class="box"></input>
                    </li>
                    <li>
                      <input type="text" class="box"></input>
                    </li>
                    <li>
                      <input type="text" class="box"></input>
                    </li>
                  </ul>
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
      </div>
    </div>
  );
};

export default Stats;
