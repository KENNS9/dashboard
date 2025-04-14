import React, { useState, useEffect } from "react";
import "./sidebar.css";
import { BiChevronDown, BiMenu } from "react-icons/bi";
import { FaHome, FaCalendarAlt, FaCalendarWeek, FaCalendarPlus } from "react-icons/fa";
import ProfilePopup from "./profilePopup";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
  const [isHovered, setIsHovered] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
  if (!isSidebarOpen) {
    setOpenMenus({}); 
  }
}, [isSidebarOpen]);

  const toggleMenu = (menu) => {
  setOpenMenus((prev) => ({
    ...prev,
    [menu]: !prev[menu],
  }));
};


  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button className="sidebar-toggle" onClick={() => {setIsSidebarOpen(!isSidebarOpen); if (isSidebarOpen) {setOpenMenus({});}}}>
          <BiMenu size={24} />
        </button>
        <div className="nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${openMenus.daily ? "active" : ""}`}
                onClick={() => toggleMenu("daily")}
              >
                <FaHome className="icon" />
                <span>Daily</span>            
                <BiChevronDown className={`arrow ${openMenus.daily ? "rotate" : ""}`} />
              </a>
              {openMenus.daily && (
                <ul className={`submenu ${openMenus.daily ? "open" : ""}`}>
                  <li><a href="#" className="nav-link sub">• Technology</a></li>
                  <li><a href="#" className="nav-link sub">• Politics</a></li>
                  <li><a href="#" className="nav-link sub">• Bussines</a></li>
                  <li><a href="#" className="nav-link sub">• Science</a></li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${openMenus.weekly ? "active" : ""}`}
                onClick={() => toggleMenu("weekly")}
              >
                <FaCalendarWeek className="icon" />
                <span>Weekly</span>
                <BiChevronDown className={`arrow ${openMenus.weekly ? "rotate" : ""}`} />
              </a>
              {openMenus.weekly && (
                <ul className={`submenu ${openMenus.weekly ? "open" : ""}`}>
                  <li><a href="#" className="nav-link sub">• Technology</a></li>
                  <li><a href="#" className="nav-link sub">• Politics</a></li>
                  <li><a href="#" className="nav-link sub">• Bussines</a></li>
                  <li><a href="#" className="nav-link sub">• Science</a></li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${openMenus.monthly ? "active" : ""}`}
                onClick={() => toggleMenu("monthly")}
              >
                <FaCalendarAlt className="icon" />
                <span>Monthly</span>
                <BiChevronDown className={`arrow ${openMenus.monthly ? "rotate" : ""}`} />
              </a>
              {openMenus.monthly && (
                <ul className={`submenu ${openMenus.monthly ? "open" : ""}`}>
                  <li><a href="#" className="nav-link sub">• Technology</a></li>
                  <li><a href="#" className="nav-link sub">• Politics</a></li>
                  <li><a href="#" className="nav-link sub">• Bussines</a></li>
                  <li><a href="#" className="nav-link sub">• Science</a></li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${openMenus.yearly ? "active" : ""}`}
                onClick={() => toggleMenu("yearly")}
              >
                <FaCalendarPlus className="icon" />
                <span>Yearly</span>
                <BiChevronDown className={`arrow ${openMenus.yearly ? "rotate" : ""}`} />
              </a>
              {openMenus.yearly && (
                <ul className={`submenu ${openMenus.yearly ? "open" : ""}`}>
                  <li><a href="#" className="nav-link sub">• Technology</a></li>
                  <li><a href="#" className="nav-link sub">• Politics</a></li>
                  <li><a href="#" className="nav-link sub">• Bussines</a></li>
                  <li><a href="#" className="nav-link sub">• Science</a></li>
                </ul>
              )}
            </li>
          </ul>
         </div>
        
       <div className="profile-section" onClick={() => setIsPopupOpen(!isPopupOpen)}>
          <img src={avatar} alt="User Avatar" className="avatar" />
          {isSidebarOpen && <span className="profile-text">My Profile</span>}
        </div>
        <ProfilePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

        
      </div>
    </>
  );
};

export default Sidebar;