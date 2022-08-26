import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "./images/logo.png";

const Topnav = () => {
  return (
    <div>
      <Navbar expand="lg">
        <div className="container-xxl">
          <Link className="navbar-brand" to={"/"}>
            <img src={logo} alt="" />
          </Link>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-between">
            <Nav>
              <Link className="nav-link" to={"/home"}>
                Home
              </Link>
              <Link className="nav-link" to={"/"}>
                Exchange
              </Link>
              <Link className="nav-link" to={"/"}>
                Liquidity
              </Link>
              <Link className="nav-link" to={"/"}>
                Analytics
              </Link>
              <Link className="nav-link" to={"/"}>
                IDO
              </Link>
              <Link className="nav-link" to={"/"}>
                More
              </Link>
            </Nav>
            <div className="d-flex">
              <Link className="btn ms-3 text-white network-btn btn-primary" to={"/"}>
                BNB
              </Link>
              <Link className="btn ms-3 text-white connect-btn btn-primary" to={"/"}>
                Connect
              </Link>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Topnav;
