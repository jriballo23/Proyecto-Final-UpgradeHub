import React from "react";
import Navigation from "./Navigation";
import NavigationMobile from "./NavigationMobile";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <>
      <Navigation />
      <NavigationMobile />
    </>
  );
};

export default NavBar;
