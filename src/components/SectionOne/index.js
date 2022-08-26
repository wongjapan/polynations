import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import logo from "./images/logo.png";
import vec1 from "./images/vec1.png";
import people from "./images/people.png";
const SectionOne = () => {
  return (
    <div className="bgcl">
      <section>
        <div>
          <div className="content">
            <p>
              Catch the DeFi Buzz with
              <img className="ftimg" src={logo} alt="" srcSet="" />
            </p>

            <button className="btn1">
              <Link to="/Page_2">Button</Link>{" "}
            </button>

            <button className="btn2">
              <Link to="/Pages_3">Button</Link>{" "}
            </button>

            <div className="img">
              <img src={people} alt="" className="sdimg" />
            </div>
            <div className="bottom">
              <img src={vec1} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionOne;
