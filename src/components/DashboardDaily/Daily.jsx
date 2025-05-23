import React, { useState, useEffect } from "react";
import "chart.js/auto";
import "./Daily.css";
import StatNews from "../ScoreCard/StatNews";
import StatPub from "../ScoreCard/StatPublishers";
import StatEvent from "../ScoreCard/StatEvent";
import SliceDate from "../Slicer/SliceDate";
// import DonutChart from "../Charts/DonutChart";
// import TrendingTopic from "../Charts/TrandingTopik";
// import GeoMap from "../Charts/GeoMap";
import GeoMap from "../Charts/GeoMapGoogle";
// import GeoMap from "../Charts/GeoMapEchart";
// import GeoMap from "../Charts/GoogleMapLeaflet";
import PieChart from "../Charts/PaiChart";
// import DonutChart from "../Charts/HalfDonatChart";
import TrendingTopic from "../Charts/TrandingTopicVer2";
// import DonutChart from "../Charts/HalfDonatChartRed";

const DashboardContent = () => {
  const [totalNews, setTotalNews] = useState(0);
  const [totalPub, setTotalPub] = useState(0);
  const [totalEvent, setTotalEvent] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [distributionData, setDistributionData] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [geoMapData, setGeoMapData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const savedDate = localStorage.getItem("selectedDate");
    return savedDate ? new Date(savedDate) : new Date();
  });

  const getFormattedDate = (date) => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const dayName = days[date.getDay()];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${dayName}, ${day} ${month} ${year}`;
};

  useEffect(() => {
    setCurrentDate(getFormattedDate(selectedDate));
  }, [selectedDate]);

  // Fetch data
  useEffect(() => {
  const fetchData = async () => {
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // e.g. 2025-04-19
      const response = await fetch(`/data/${formattedDate}.json`);
      const data = await response.json();
      setTotalNews(data.totalNews);
      setTotalPub(data.totalPublishers);
      setTotalEvent(data.totalEvents);
      setGeoMapData(data.geoMapChart);

      if (data.distributionChart) {
        setDistributionData(data.distributionChart);
        setTrendingTopics(data.distributionChart);
      }
      
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [selectedDate]);

const handleDateChange = (date) => {
    setSelectedDate(date);
    localStorage.setItem("selectedDate", date.toISOString());
  };

  return (
    <div>
      <div className="header-content">
        <h1>Daily Dashboard</h1>
        <p>{currentDate}</p>
      </div>
      <div className="p-6 flex gap-10">
        <StatNews title="Total News" value={totalNews} />
        <StatPub title="Publishers" value={totalPub} />
        <StatEvent title="Total Event" value={totalEvent} />
        <SliceDate
          title="Date Slicer"
          selectedDate={selectedDate}
          onDateChange={(date) => setSelectedDate(date)}
        />
      </div>
      <div className="p-6 flex gap-10">
        {/* <DonutChart rawData={distributionData} /> */}
        <PieChart rawData={distributionData} />
        <TrendingTopic distributionChart={trendingTopics} />
      </div>
      <div className="p-6 flex gap-10">
        <GeoMap data={geoMapData} />
      </div>

    </div>
  );
};

export default DashboardContent;