import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/LogIn/Login";
import SignUp from "./components/SignUp/Signup";
import DashboardContent from "./components/DashboardContent/Daily";
import Layout from "./Layout/Layout";
import NotFoundPage from "./components/RequireAuth/NotFoundPage";
import WeeklyContent from "./components/DashboardContent/Weekly";
import Profile from "./components/Profile/profile";
import MonthlyContent from "./components/DashboardContent/Monthly";
import YearlyContent from "./components/DashboardContent/Yearly";
import DailyTechnology from "./components/DashboardKategori/DailyTechnology";
import DailyBusiness from "./components/DashboardKategori/DailyBusiness";
import WeeklyTechnology from "./components/DashboardKategori/WeeklyTechnology";
import WeeklyBusiness from "./components/DashboardKategori/WeeklyBusiness";
import MonthlyTechnology from "./components/DashboardKategori/MonthlyTechnology";
import MonthlyBussines from "./components/DashboardKategori/MonthlyBusiness";
import YearlyTechnology from "./components/DashboardKategori/YearlyTechnology";
import YearlyBussines from "./components/DashboardKategori/YearlyBussines";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/daily" element={<Layout><DashboardContent/></Layout>} />
        <Route path="/notFound" element={<NotFoundPage/>} />
        <Route path="/weekly" element={<Layout><WeeklyContent/></Layout>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/monthly" element={<Layout><MonthlyContent/></Layout>} />
        <Route path="/yearly" element={<Layout><YearlyContent/></Layout>} />
        <Route path="/dailyTechnology" element={<Layout><DailyTechnology /></Layout>} />
        <Route path="/dailyBusiness" element={<Layout><DailyBusiness /></Layout>} />
        <Route path="/weeklyTechnology" element={<Layout><WeeklyTechnology/></Layout>} />
        <Route path="/weeklyBusiness" element={<Layout><WeeklyBusiness/></Layout>} />
        <Route path="/monthlyTechnology" element={<Layout><MonthlyTechnology/></Layout>} />
        <Route path="/monthlyBusiness" element={<Layout><MonthlyBussines/></Layout>} />
        <Route path="/yearlyTechnology" element={<Layout><YearlyTechnology/></Layout>} />
        <Route path="/yearlyBusiness" element={<Layout><YearlyBussines/></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;