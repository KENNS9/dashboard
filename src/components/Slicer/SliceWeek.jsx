import React, { useState } from "react";
import "./Slicer.css";
import { FaCalendarAlt } from "react-icons/fa";

const WeeklySlicer = ({ selectedDate, onWeekChange }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate));

  // Fungsi untuk mendapatkan hari Senin dari minggu yang mengandung tanggal yang diberikan
  const getStartOfWeek = (date) => {
    const start = new Date(date);
    // Atur jam, menit, detik, milidetik ke 0 untuk menghindari masalah zona waktu
    start.setHours(0, 0, 0, 0); 
    const day = start.getDay(); // 0 = Minggu, 1 = Senin, ..., 6 = Sabtu
    // Jika hari ini Minggu (0), diff adalah -6 untuk mendapatkan Senin minggu sebelumnya
    // Jika hari ini Senin (1), diff adalah 0 (sudah Senin)
    // Jika hari ini Selasa (2), diff adalah -1 (Senin kemarin)
    // Rumus: (day === 0 ? -6 : 1 - day)
    // Lebih sederhana: (day + 6) % 7 --> ini untuk mendapatkan hari Minggu (0) sebagai hari ke-6
    // Untuk mendapatkan hari Senin (1) sebagai hari ke-0 relatif terhadap awal minggu:
    // const diff = (start.getDay() + 6) % 7; // Hari Minggu (0) akan menjadi 6, Senin (1) menjadi 0
    // start.setDate(start.getDate() - diff);
    //
    // Cara yang lebih langsung untuk Senin:
    const diff = start.getDay() === 0 ? -6 : 1 - start.getDay(); // Jika Minggu (0), mundur 6 hari. Jika bukan Minggu, mundur ke Senin.
    start.setDate(start.getDate() + diff);
    return start;
  };

  const getDaysInMonthGrid = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    
    // getDay() mengembalikan 0 (Minggu) - 6 (Sabtu)
    // Kita ingin Monday menjadi hari pertama (indeks 0 di array day-header)
    // Jika 1 Mei 2025 adalah Kamis (getDay()=4), maka startWeekDay adalah (4 + 6) % 7 = 3.
    // Ini berarti 3 "slot kosong" sebelum hari pertama bulan muncul di Kamis (indeks 3).
    const startWeekDay = (firstDayOfMonth.getDay() + 6) % 7; 

    const days = [];
    for (let i = 0; i < startWeekDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
      days.push(new Date(year, month, i));
    }
    const remainingCells = (7 - (days.length % 7)) % 7;
    for (let i = 0; i < remainingCells; i++) {
      days.push(null);
    }

    return days;
  };

  const handleDateClick = (day) => {
    onWeekChange(day);
    setShowCalendar(false);
  };

  const selectedWeekStart = getStartOfWeek(selectedDate);
  const selectedWeekEnd = new Date(selectedWeekStart);
  selectedWeekEnd.setDate(selectedWeekEnd.getDate() + 6);

  const formatWeekRange = (startDate, endDate) => {
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const monthStart = startDate.toLocaleString("default", { month: "short" });
    const monthEnd = endDate.toLocaleString("default", { month: "short" });
    const year = endDate.getFullYear();

    if (startDate.getFullYear() !== endDate.getFullYear()) {
      return `${startDay} ${monthStart} ${startDate.getFullYear()} - ${endDay} ${monthEnd} ${year}`;
    } else if (monthStart === monthEnd) {
      return `${startDay} ${monthStart} - ${endDay} ${year}`;
    } else {
      return `${startDay} ${monthStart} - ${endDay} ${monthEnd} ${year}`;
    }
  };
  

  return (
    <div className="slicer-container">
      <div className="slicer-input" onClick={() => setShowCalendar(!showCalendar)}>
        <div className="picker-input">
          <div className="date-display">
            {formatWeekRange(selectedWeekStart, selectedWeekEnd)}
          </div>
          <FaCalendarAlt size={20} color="#808080" />
        </div>
      </div>

      {showCalendar && (
        <div className="calendar-dropdown">
          <div className="calendar-selector">
            <select
              value={currentMonth.getMonth()}
              onChange={(e) => {
                const newDate = new Date(currentMonth);
                newDate.setMonth(Number(e.target.value));
                setCurrentMonth(newDate);
              }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <select
              value={currentMonth.getFullYear()}
              onChange={(e) => {
                const newDate = new Date(currentMonth);
                newDate.setFullYear(Number(e.target.value));
                setCurrentMonth(newDate);
              }}
            >
              {Array.from({ length: 11 }, (_, i) => {
                const year = new Date().getFullYear() - 5 + i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="calendar-grid">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
              <div key={day} className="day-header">{day}</div>
            ))}

            {getDaysInMonthGrid(currentMonth).map((day, idx) => {
              const isToday = day && day.toDateString() === new Date().toDateString();
              const isInSelectedWeek =
                day &&
                day >= selectedWeekStart &&
                day <= selectedWeekEnd; 

              return (
                <div
                  key={idx}
                  className={`day-cell 
                    ${isToday ? "today" : ""} 
                    ${isInSelectedWeek ? "highlight" : ""}
                    ${day ? "" : "empty-cell"}
                  `}
                  onClick={() => day && handleDateClick(day)}
                >
                  {day ? day.getDate() : ""}
                </div>
              );
            })}
          </div>

          <div className="calendar-actions">
            <button className="clear-btn" onClick={() => setShowCalendar(false)}>
              Clear
            </button>
            <button
              className="today-btn"
              onClick={() => {
                const today = new Date();
                onWeekChange(today);
                setCurrentMonth(today);
                setShowCalendar(false);
              }}
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySlicer;