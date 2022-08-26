import React from "react";

import vec from "./images/vec.png";
import home_photo from "./images/home_photo.png";
import mask_group from "./images/mask_group.png";

import "./style.scss";

const SectionGlobe = () => {
  return (
    <div>
      <section className="glob">
        <div className="glob_img">
          <h2>Our Values</h2>

          <div className="card text-center">
            <div className="glob_inner_img">
              <img src={home_photo} alt="" className="" />
            </div>
            <div className="card-body text-dark">
              <h4 className="card-title">Accessibility</h4>
              <p className="card-text text-secondary">
                We create tools for users to leverage DeFi opportunities, regardless of location, background, wealth, or experience.
              </p>
            </div>
          </div>
          <div className="card text-center">
            <div className="glob_inner_img">
              <img src={mask_group} alt="" className="" />
            </div>
            <div className="card-body text-dark">
              <h4 className="card-title">Transparency</h4>
              <p className="card-text text-secondary">
                We build together through transparent governance and processes that ensure our community understands our goals.
              </p>
            </div>
          </div>
          <div className="card text-center">
            <div className="glob_inner_img">
              <img src={vec} alt="" className="small_img" />
            </div>
            <div className="card-body text-dark">
              <h4 className="card-title">Security</h4>
              <p className="card-text text-secondary">
                We ensure that the safety of the funds of our users and partners is our highest priority.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionGlobe;
