import React from "react";
import "./Slicer.css";  

const SliceDate = ({selectedDate, onDateChange }) => {
  return (
    <div className="slicer-container">
      <label className="slicer-label"></label>
      <input
        type="date"
        value={selectedDate.toISOString().split("T")[0]}
        onChange={(e) => onDateChange(new Date(e.target.value))}
        className="slicer-input"
      />
    </div>
  );
};

export default SliceDate;
