import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaHome, FaCog } from "react-icons/fa";
import avatarList from "../../assets/avatarList";

const Navbar = () => {
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let storedAvatar = localStorage.getItem("selectedAvatar");

    if (!storedAvatar) {
      const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];
      localStorage.setItem("selectedAvatar", randomAvatar);
      storedAvatar = randomAvatar;
    }

    setAvatar(storedAvatar);
  }, []);

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
        <img
          src={avatar}
          alt="User Avatar"
          className="user-avatar"
          onClick={() => navigate("/profile-settings")}
        />
      </div>
    </nav>
  );
};

export default Navbar;