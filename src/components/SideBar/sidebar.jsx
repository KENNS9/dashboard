import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { BiChevronDown, BiMenu } from "react-icons/bi";
import { FaHome, FaCalendarAlt, FaCalendarWeek, FaCalendarPlus } from "react-icons/fa";
import ProfilePopup from "./profilePopup";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});
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

  useEffect(() => {
    const loadAvatar = () => {
      const storedAvatar = localStorage.getItem("selectedAvatar");
      setAvatar(storedAvatar || "");
    };

    loadAvatar();

    // Listen to global event when avatar is changed
    window.addEventListener("avatarChanged", loadAvatar);

    return () => {
      window.removeEventListener("avatarChanged", loadAvatar);
    };
  }, []);

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        <button
          className="sidebar-toggle"
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
            if (isSidebarOpen) {
              setOpenMenus({});
            }
          }}
        >
          <BiMenu size={24} />
        </button>

        <div className="nav">
          <ul className="nav flex-column">
            <li className="nav-item">
              <div className={`nav-link-wrapper ${openMenus.daily ? "active" : ""}`}>
                <Link to="/daily" className="nav-link">
                  <FaHome className="icon" />
                  <span>Daily</span>
                </Link>
                <BiChevronDown
                  className={`arrow ${openMenus.daily ? "rotate" : ""}`}
                  onClick={() => toggleMenu("daily")}
                />
              </div>
              {openMenus.daily && (
                <ul className="submenu open">
                  <li><Link to="/dailyTechnology" className="nav-link sub">• Technology</Link></li>
                  <li><Link to="/dailyBusiness" className="nav-link sub">• Business</Link></li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <div className={`nav-link-wrapper ${openMenus.weekly ? "active" : ""}`}>
                <Link to="/weekly" className="nav-link">
                  <FaCalendarWeek className="icon" />
                  <span>Weekly</span>
                </Link>
                <BiChevronDown
                  className={`arrow ${openMenus.weekly ? "rotate" : ""}`}
                  onClick={() => toggleMenu("weekly")}
                />
              </div>
              {openMenus.weekly && (
                <ul className="submenu open">
                  <li><Link to="/weeklyTechnology" className="nav-link sub">• Technology</Link></li>
                  <li><Link to="/weeklyBusiness" className="nav-link sub">• Business</Link></li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <div className={`nav-link-wrapper ${openMenus.monthly ? "active" : ""}`}>
                <Link to="/monthly" className="nav-link">
                  <FaCalendarAlt className="icon" />
                  <span>Monthly</span>
                </Link>
                <BiChevronDown
                  className={`arrow ${openMenus.monthly ? "rotate" : ""}`}
                  onClick={() => toggleMenu("monthly")}
                />
              </div>
              {openMenus.monthly && (
                <ul className="submenu open">
                  <li><Link to="/monthlyTechnology" className="nav-link sub">• Technology</Link></li>
                  <li><Link to="/monthlyBusiness" className="nav-link sub">• Business</Link></li>
                </ul>
              )}
            </li>

            <li className="nav-item">
              <div className={`nav-link-wrapper ${openMenus.yearly ? "active" : ""}`}>
                <Link to="/yearly" className="nav-link">
                  <FaCalendarPlus className="icon" />
                  <span>Yearly</span>
                </Link>
                <BiChevronDown
                  className={`arrow ${openMenus.yearly ? "rotate" : ""}`}
                  onClick={() => toggleMenu("yearly")}
                />
              </div>
              {openMenus.yearly && (
                <ul className="submenu open">
                  <li><Link to="/yearlyTechnology" className="nav-link sub">• Technology</Link></li>
                  <li><Link to="/yearlyBusiness" className="nav-link sub">• Business</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        <div className="profile-section" onClick={() => {
          if (isSidebarOpen){
            setIsPopupOpen(!isPopupOpen);
          }
        }}>
          <img
            src={avatar || "/default-avatar.png"}
            alt="User Avatar"
            className="avatar"
          />
          {isSidebarOpen && <span className="profile-text">My Profile</span>}
        </div>

        <ProfilePopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
