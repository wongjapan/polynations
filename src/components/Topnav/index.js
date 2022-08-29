import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./style.scss";
import logo from "./images/logo.png";
import bnblogo from "./images/bnblogo.png";
import polynationlogo from "./images/polynationlogo.png";

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
              <div className="cont">
                <p className="img">
                  <img src={bnblogo} alt="" />
                </p>
                <p className="para">BNB</p>
              </div>
              <div className="cont connect-btn">
                <p className="para sec1">Connect</p>
                <p className="img_bor">
                  <img src={polynationlogo} alt="" />
                </p>
              </div>
            </div>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </div>
  );
};

export default Topnav;
