import React from "react";
import "./PopupFailed.css";
import { AiOutlineCloseCircle } from "react-icons/ai";

const PopupFailed = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-icon">
          <AiOutlineCloseCircle size={90} color="#f44336" />
        </div>
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>
        <button className="popup-button" onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default PopupFailed;
