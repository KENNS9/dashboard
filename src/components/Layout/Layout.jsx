import React, { useState } from "react";
import Navbar from "../Navbar/navbar";
import Sidebar from "../SideBar/sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <div className="content-wrapper">
        <Sidebar />
        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;