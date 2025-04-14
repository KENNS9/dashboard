import React, { useEffect, useRef } from "react";
import { BiCog, BiLogOut } from "react-icons/bi";
import "./popUp.css";

const ProfilePopup = ({ isOpen, onClose }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={popupRef} className="popup">
      <h4>My Profile</h4>
      <div className="popup-item">
        <BiCog className="popup-icon" /> Settings
      </div>
      <div className="popup-item">
        <BiLogOut className="popup-icon" /> Log out
      </div>
    </div>
  );
};

export default ProfilePopup;
