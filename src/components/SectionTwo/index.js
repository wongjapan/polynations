import React from "react";
import arrowImages from "./images/arrow.png";
import BNBLogoImages from "./images/BNBLogo.png";

import "./style.scss";
const SectionTwo = () => {
  return (
    <div>
      <div className="market_chartmain">
        <p className="coin_head">Popular cryptocurrencies</p>

        <div className="market_chart">
          <p className="more_mark">
            View More Market <img src={arrowImages} alt="" className="arr_img" />{" "}
          </p>
          <ul className="no-bg">
            <li className="first1">Name</li>
            <li className="">Last Price</li>
            <li className="color-option third3">24h Change</li>
            <li className="align-right fourth4">Market Cap</li>
          </ul>
          <ul>
            <li className="first1">
              <img src={BNBLogoImages} alt="" srcSet="" /> BNB <span>BNB</span>
            </li>
            <li className="bold">$289.2</li>
            <li className="color-option third3">-5.02%</li>
            <li className="align-right fourth4">BNB</li>
          </ul>
          <ul>
            <li className="first1">
              <img src={BNBLogoImages} alt="" srcSet="" /> BNB <span>BNB</span>
            </li>
            <li className="bold">$289.2</li>
            <li className="color-option third3">-5.02%</li>
            <li className="align-right fourth4">BNB</li>
          </ul>
          <ul>
            <li className="first1">
              <img src={BNBLogoImages} alt="" srcSet="" /> BNB <span>BNB</span>
            </li>
            <li className="bold">$289.2</li>
            <li className="color-option third3">-5.02%</li>
            <li className="align-right fourth4">BNB</li>
          </ul>
          <ul>
            <li className="first1">
              <img src={BNBLogoImages} alt="" srcSet="" /> BNB <span>BNB</span>
            </li>
            <li className="bold">$289.2</li>
            <li className="color-option third3">-5.02%</li>
            <li className="align-right fourth4">BNB</li>
          </ul>
          <ul>
            <li className="first1">
              <img src={BNBLogoImages} alt="" srcSet="" /> BNB <span>BNB</span>
            </li>
            <li className="bold">$289.2</li>
            <li className="color-option third3">-5.02%</li>
            <li className="align-right fourth4">BNB</li>
          </ul>
          <ul>
            <li className="first1">
              <img src={BNBLogoImages} alt="" srcSet="" /> BNB <span>BNB</span>
            </li>
            <li className="bold">$289.2</li>
            <li className="color-option third3">-5.02%</li>
            <li className="align-right fourth4">BNB</li>
          </ul>
          <ul>
            <li className="first1">
              <img src={BNBLogoImages} alt="" srcSet="" /> BNB <span>BNB</span>
            </li>
            <li className="bold">$289.2</li>
            <li className="color-option third3">-5.02%</li>
            <li className="align-right fourth4">BNB</li>
          </ul>
        </div>
      </div>

      {/* section 2 */}
    </div>
  );
};

export default SectionTwo;
