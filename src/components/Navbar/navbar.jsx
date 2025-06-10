import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaHome, FaCog } from "react-icons/fa";
import Profile from "../Profile/profile";

const Navbar = () => {
  const [avatar, setAvatar] = useState("");
  const navigate = useNavigate();
  const [showProfileOpen, setProfileOpen] = useState(false);

  const handleProfileClose = () => {
    const updatedAvatar = localStorage.getItem("selectedAvatar");
    setAvatar(updatedAvatar);
    setProfileOpen(false);
  };

  useEffect(() => {
    const storedAvatar = localStorage.getItem("selectedAvatar");
    setAvatar(storedAvatar || "");
  }, []);

  useEffect(() => {
    const updateAvatar = () => {
      const newAvatar = localStorage.getItem("selectedAvatar");
      setAvatar(newAvatar || "");
    };

    window.addEventListener("avatarChanged", updateAvatar);

    return () => {
      window.removeEventListener("avatarChanged", updateAvatar);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <a href="#">
          <img src="./images/def.png" alt="Logo" className="logo" />
        </a>
      </div>

      <div className="menu">
        <button className="icon-btn" onClick={() => navigate("/daily")}>
          <FaHome />
        </button>
        <button className="icon-btn" onClick={() => navigate("/notFound")}>
          <FaCog />
        </button>
        <img
          src={avatar || "/default-avatar.png"}
          alt="User Avatar"
          className="user-avatar"
          onClick={() => setProfileOpen(true)}
        />
      </div>
      <Profile isOpen={showProfileOpen} onClose={handleProfileClose} />
    </nav>
  );
};

export default Navbar;
