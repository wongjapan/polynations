import React from "react";
import "./style.scss";

import poly_footer from "./images/poly_footer.png";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="row">
          <div className="col">
            <img src={poly_footer} alt="" />
          </div>
          <div className="col pad">
            <h3>Support</h3>
            <p>
              <a href="#top">FAQ</a>
            </p>
            <p>
              <a href="https://discord.com/">Discord</a>
            </p>

            <p>
              <a href="https://discord.com/">Tokenomics</a>
            </p>
            <p>
              <a href="https://discord.com/">Audits</a>
            </p>
          </div>
          <div className="col pad">
            <h3>Engage</h3>
            <p>
              <a href="#top">Governance</a>
            </p>
            <p>
              <a href="#top">Partner Application</a>
            </p>
            <p>
              <a href="#top">Bug Bounty</a>
            </p>
            <p>
              <a href="#top">Developer Grants</a>
            </p>
          </div>
          <div className="col">
            <h3>Learn</h3>
            <p>
              <a href="#top">Docs</a>
            </p>
            <p>
              <a href="#top">Arbor Labs</a>
            </p>
            <p>
              <a href="#top">Community</a>
            </p>
            <p>
              <a href="https://github.com/">Github</a>
            </p>
          </div>
        </div>
        <p className="copyright">Copyright © 2022. All rights Reserved,</p>
      </footer>
    </div>
  );
};

export default Footer;
