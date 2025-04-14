import React, { useState, useEffect } from "react";
import "chart.js/auto";
import "./Dashboard.css";
import StatNews from "../ScoreCard/StatNews";
import StatPub from "../ScoreCard/StatPublishers";
import StatKeyword from "../ScoreCard/StatKey";

const DashboardContent = () => {
  const [totalNews, setTotalNews] = useState(0);
  const [totalPub, setTotalPub] = useState(0);
  const [totalKeywords, setTotalKeywords] = useState(0);
  const [currentDate, setCurrentDate] = useState("");

  const getFormattedDate = () => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const today = new Date();
    const dayName = days[today.getDay()];
    const date = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    return `${dayName}, ${date} ${monthName} ${year}`;
  };

  useEffect(() => {
    setCurrentDate(getFormattedDate());
  }, []);

  // Fetch data total news
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data.json");
        const data = await response.json();
        setTotalNews(data.totalNews);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fetch data total publishers
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data.json");
        const data = await response.json();
        setTotalPub(data.totalPublishers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Fetch data total keywords
   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/data.json");
        const data = await response.json();
        setTotalKeywords(data.totalKeywords);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="header-content">
        <h1>Daily Dashboard</h1>
        <p>{currentDate}</p>
      </div>
      <div className="p-4 flex gap-10">
        <StatNews title="Total News" value={totalNews} />
        <StatPub title="Publishers" value={totalPub} />
        <StatKeyword title="Keywords" value={totalKeywords} />
      </div>

    </div>
  );
};

export default DashboardContent;