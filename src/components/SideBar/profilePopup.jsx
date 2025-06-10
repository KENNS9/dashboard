import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiCog, BiLogOut } from "react-icons/bi";
import "./popUp.css";
import Profile from "../Profile/profile";
import avatarList from "../../assets/avatarList"; 

const ProfilePopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();

  const [showProfileOpen, setProfileOpen] = useState(false);
  const [avatar, setAvatar] = useState("");

  const handleProfileClose = () => {
    const updatedAvatar = localStorage.getItem("selectedAvatar");
    setAvatar(updatedAvatar);
    setProfileOpen(false);
  };

  useEffect(() => {
    let storedAvatar = localStorage.getItem("selectedAvatar");

    if (!storedAvatar) {
      const randomAvatar = avatarList[Math.floor(Math.random() * avatarList.length)];
      localStorage.setItem("selectedAvatar", randomAvatar);
      storedAvatar = randomAvatar;
    }

    setAvatar(storedAvatar);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={popupRef} className="popup-profile">
      <h4>My Profile</h4>
      <div className="avatar-preview">
        <img src={avatar} alt="Current Avatar" />
      </div>
      <div className="profile-item" onClick={() => setProfileOpen(true)}>
        <BiCog size={20} /> Settings
      </div>
      <div className="profile-item" onClick={() => navigate("/")}>
        <BiLogOut size={20} /> Log out
      </div>

      <Profile isOpen={showProfileOpen} onClose={handleProfileClose} />
    </div>
  );
};

export default ProfilePopup;
