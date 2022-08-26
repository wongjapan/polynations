import React from "react";
import Topnav from "./Topnav";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Topnav />
      {children}
      <Footer />
    </>
  );
}
