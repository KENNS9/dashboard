import React, { useState, useEffect } from "react";
import "./Slicer.css";
import { FaCalendarAlt } from "react-icons/fa";

const YearlySlicer = ({ selectedYear, onYearChange }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentViewYear, setCurrentViewYear] = useState(selectedYear);

  useEffect(() => {
    setCurrentViewYear(selectedYear);
  }, [selectedYear]);

  const years = Array.from({ length: 16 }, (_, i) => new Date().getFullYear() - 10 + i);
  const handleYearClick = (year) => {
    onYearChange(year); 
    setShowDropdown(false)
  };

  const handlePreviousDecade = () => {
    setCurrentViewYear(prevYear => prevYear - 10); 
  };

  const handleNextDecade = () => {
    setCurrentViewYear(prevYear => prevYear + 10);
  };

  const handleCurrentYearClick = () => {
    const currentYear = new Date().getFullYear();
    onYearChange(currentYear);
    setShowDropdown(false);
  };

  return (
    <div className="slicer-container">
      <div className="slicer-input" onClick={() => setShowDropdown(!showDropdown)}>
        <div className="picker-input">
          <div className="date-display">
            {selectedYear}
          </div>
          <FaCalendarAlt size={20} color="#808080" />
        </div>
      </div>

      {showDropdown && (
        <div className="calendar-dropdown">
          <div className="calendar-header">
            <button className="nav-button" onClick={handlePreviousDecade}>&lt;</button>
            <span className="year-range-display">
              {currentViewYear - 5} - {currentViewYear + 5}
            </span>
            <button className="nav-button" onClick={handleNextDecade}>&gt;</button>
          </div>

          <div className="years-grid">
            {Array.from({ length: 10 }, (_, i) => currentViewYear - 5 + i).map((year) => {
              const isSelectedYear = selectedYear === year;
              const isCurrentYear = new Date().getFullYear() === year;

              return (
                <div
                  key={year}
                  className={`year-cell 
                    ${isSelectedYear ? "selected" : ""}
                    ${!isSelectedYear && isCurrentYear ? "today-year" : ""}
                  `}
                  onClick={() => handleYearClick(year)}
                >
                  {year}
                </div>
              );
            })}
          </div>

          <div className="calendar-actions">
            <button className="clear-btn" onClick={() => setShowDropdown(false)}>
              Clear
            </button>
            <button className="today-btn" onClick={handleCurrentYearClick}>
              This Year
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YearlySlicer;