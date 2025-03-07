import React, { useState } from "react";
import "./sidebar.css";
import { BiChevronDown, BiList } from "react-icons/bi";

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <div className="sidebar">
      <ul className="nav flex-column">
        {/* Dashboard */}
        <li className="nav-item">
          <a
            href="#"
            className={`nav-link ${openMenus.dashboard ? "active" : ""}`}
            onClick={() => toggleMenu("dashboard")}
          >
            <FaHome className="icon" />
            <span>Dashboard</span>
            <BiChevronDown className={`arrow ${openMenus.dashboard ? "rotate" : ""}`} />
          </a>
          <ul className={`submenu ${openMenus.dashboard ? "open" : ""}`}>
            <li><a href="#" className="nav-link sub">• Daily</a></li>

            <li>
              <a href="#" className="nav-link sub" onClick={() => toggleMenu("weekly")}>
                • Weekly <BiChevronDown className={`arrow ${openMenus.weekly ? "rotate" : ""}`} />
              </a>
              <ul className={`submenu ${openMenus.weekly ? "open" : ""}`}>
                {[1, 2, 3, 4].map((week) => (
                  <li key={week}><a href="#" className="nav-link sub">• Week {week}</a></li>
                ))}
              </ul>
            </li>

            <li>
              <a href="#" className="nav-link sub" onClick={() => toggleMenu("monthly")}>
                • Monthly <BiChevronDown className={`arrow ${openMenus.monthly ? "rotate" : ""}`} />
              </a>
              <ul className={`submenu ${openMenus.monthly ? "open" : ""}`}>
                {["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                  "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
                  .map((month) => (
                    <li key={month}><a href="#" className="nav-link sub">• {month}</a></li>
                  ))}
              </ul>
            </li>

            <li>
              <a href="#" className="nav-link sub" onClick={() => toggleMenu("yearly")}>
                • Yearly <BiChevronDown className={`arrow ${openMenus.yearly ? "rotate" : ""}`} />
              </a>
              <ul className={`submenu ${openMenus.yearly ? "open" : ""}`}>
                {[2021, 2022, 2023, 2024, 2025].map((year) => (
                  <li key={year}><a href="#" className="nav-link sub">• {year}</a></li>
                ))}
              </ul>
            </li>
          </ul>
        </li>

        {/* Category */}
        <li className="nav-item">
          <a href="#" className="nav-link" onClick={() => toggleMenu("category")}>
            <BiList className="icon" />
            <span>Category</span>
            <BiChevronDown className={`arrow ${openMenus.category ? "rotate" : ""}`} />
          </a>
          <ul className={`submenu ${openMenus.category ? "open" : ""}`}>
            {["Business", "Top", "World", "Politics", "Lifestyle",
              "Sports", "Health", "Environment", "Crime", "Other"]
              .map((category) => (
                <li key={category}><a href="#" className="nav-link sub">• {category}</a></li>
              ))}
          </ul>
        </li>

        {/* Settings */}
        <li className="nav-item">
          <a href="#" className="nav-link">
            <FaCog className="icon" />
            <span>Settings</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
