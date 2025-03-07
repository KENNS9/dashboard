// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardContent from "./components/DashboardDaily/Dashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardContent />} />"
      </Routes>
    </Router>
  );
}

export default App;
