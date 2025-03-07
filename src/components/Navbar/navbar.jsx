import React from "react";
import "./navbar.css";
import { FaHome, FaCog } from "react-icons/fa";
// import ToggleSwitch from "./ToggleSwitch";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="#">
          <img src="./images/def.png" alt="Logo" className="logo" />
        </a>
      </div>

      <div className="menu">
        <button className="icon-btn">
          <FaHome />
        </button>
        <button className="icon-btn">
          <FaCog />
        </button>
        {/* <ToggleSwitch /> */}
        <img src="/images/user.jpg" alt="User" className="user-avatar" />
      </div>
    </nav>
  );
}

export default Navbar;
