import React, { useState } from "react";
import Navbar from "../components/Navbar/navbar";
import Sidebar from "../components/SideBar/sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`layout ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      <Navbar />
      <div className="content-wrapper">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          {React.Children.map(children, (child) =>
            React.cloneElement(child, { isSidebarOpen })
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
