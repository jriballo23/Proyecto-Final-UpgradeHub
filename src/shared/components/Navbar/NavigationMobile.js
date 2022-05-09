import React from "react";
import NavLinks from "./NavLinks";
import { GoThreeBars as Bars } from "react-icons/go";
import { AiOutlineCloseSquare as Close } from "react-icons/ai";
import { useState } from "react";


const NavigationMobile = () => {
  const [open, openState] = useState(false);
  const burgerIcon = <Bars className="bars" onClick={() => openState(!open)} />;
  const closeIcon = <Bars className="bars" onClick={() => openState(!open)} />;
  return (
    <nav className="nav-mobile">
      <img src="./cloudpng.png" alt="logo" />
      {open ? closeIcon : burgerIcon}
      {open && <NavLinks />}
    </nav>
  );
};

export default NavigationMobile;
