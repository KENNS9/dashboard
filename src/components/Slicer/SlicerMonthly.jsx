import React, { useState, useEffect } from "react";
import "./Slicer.css";
import { FaCalendarAlt } from "react-icons/fa";

const MonthlySlicer = ({ selectedDate, onMonthChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentViewDate, setCurrentViewDate] = useState(new Date(selectedDate));

  useEffect(() => {
    console.log("MonthlySlicer useEffect: selectedDate changed to", selectedDate);
    setCurrentViewDate(new Date(selectedDate));
  }, [selectedDate]);

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const formatMonthYear = (date) => {
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handlePreviousYear = () => {
    const newDate = new Date(currentViewDate);
    newDate.setFullYear(newDate.getFullYear() - 1);
    setCurrentViewDate(newDate);
    console.log("Navigated to year:", newDate.getFullYear());
  };

  const handleNextYear = () => {
    const newDate = new Date(currentViewDate);
    newDate.setFullYear(newDate.getFullYear() + 1);
    setCurrentViewDate(newDate);
    console.log("Navigated to year:", newDate.getFullYear());
  };

  const handleMonthClick = (monthIndex) => {
    const newSelectedMonth = new Date(currentViewDate.getFullYear(), monthIndex, 1);
    console.log("Month cell clicked. New selected month:", newSelectedMonth);
    onMonthChange(newSelectedMonth); // Ini memanggil onMonthChange dari parent
    setShowCalendar(false);
  };

  const handleTodayClick = () => {
    const today = new Date();
    const firstDayOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    onMonthChange(firstDayOfCurrentMonth);
    setCurrentViewDate(firstDayOfCurrentMonth);
    setShowCalendar(false);
    console.log("Clicked Today/This Month:", firstDayOfCurrentMonth);
  };

  const handleClearClick = () => {
    setShowCalendar(false);
    console.log("Clear button clicked.");
  };

  return (
    <div className="slicer-container">
      <div className="slicer-input" onClick={() => setShowCalendar(!showCalendar)}>
        <div className="picker-input">
          <div className="date-display">
            {formatMonthYear(selectedDate)}
          </div>
          <FaCalendarAlt size={20} color="#808080" />
        </div>
      </div>

      {showCalendar && (
        <div className="calendar-dropdown">
          <div className="calendar-header">
            <button className="nav-button" onClick={handlePreviousYear}>&lt;</button>
            <span className="year-display">{currentViewDate.getFullYear()}</span>
            <button className="nav-button" onClick={handleNextYear}>&gt;</button>
          </div>

          <div className="months-grid">
            {months.map((monthName, index) => {
              const isSelectedMonth =
                selectedDate.getMonth() === index &&
                selectedDate.getFullYear() === currentViewDate.getFullYear();
              
              const isCurrentMonth =
                new Date().getMonth() === index &&
                new Date().getFullYear() === currentViewDate.getFullYear();

              return (
                <div
                  key={index}
                  className={`month-cell 
                    ${isSelectedMonth ? "selected" : ""}
                    ${!isSelectedMonth && isCurrentMonth ? "today-month" : ""}
                  `}
                  onClick={() => handleMonthClick(index)}
                >
                  {monthName}
                </div>
              );
            })}
          </div>

          <div className="calendar-actions">
            <button className="clear-btn" onClick={handleClearClick}>
              Clear
            </button>
            <button className="today-btn" onClick={handleTodayClick}>
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MonthlySlicer;