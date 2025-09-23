import React from "react";
import "./style.css";

const BurgerMenu = ({ isOpen, toggle }) => {
  return (
    <div className={`burger-menu ${isOpen ? "open" : ""}`} onClick={toggle}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default BurgerMenu;
