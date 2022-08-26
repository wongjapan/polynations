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
          <div class="content">
            <p>
              Catch the DeFi Buzz with
              <img class="ftimg" src={logo} alt="" srcset="" />
            </p>

            <button class="btn1">
              <Link to="/Page_2">Button</Link>{" "}
            </button>

            <button class="btn2">
              <Link to="/Pages_3">Button</Link>{" "}
            </button>

            <div class="img">
              <img src={people} alt="" class="sdimg" />
            </div>
            <div class="bottom">
              <img src={vec1} alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionOne;
