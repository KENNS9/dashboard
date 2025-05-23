import React from "react";
import "./PopupSuccess.css";
import { AiOutlineCheckCircle } from "react-icons/ai";

const PopupSuccess = ({ show, onClose, title, message }) => {
  if (!show) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <div className="popup-icon">
          <AiOutlineCheckCircle size={90} color="#237D31" />
        </div>
        <h2 className="popup-title">{title}</h2>
        <p className="popup-message">{message}</p>
        <button className="popup-button" onClick={onClose}>Ok</button>
      </div>
    </div>
  );
};

export default PopupSuccess;
