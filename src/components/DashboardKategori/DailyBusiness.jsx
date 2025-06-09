import React, { useState, useEffect } from "react";
import "chart.js/auto";
import StatNews from "../ScoreCard/StatNews";
import StatPub from "../ScoreCard/StatPublishers";
import StatEvent from "../ScoreCard/StatEvent";
import SliceDate from "../Slicer/SliceDate";
import GeoMap from "../Charts/GeoMapGoogle";
import PieChart from "../Charts/PieChart";
import TrendingTopic from "../Charts/TrendingTopicVer2";

const DailyBusiness = () => {
  const [totalNews, setTotalNews] = useState(0);
  const [totalPub, setTotalPub] = useState(0);
  const [totalEvent, setTotalEvent] = useState(0);
  const [currentDate, setCurrentDate] = useState("");
  const [distributionData, setDistributionData] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [geoMapData, setGeoMapData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); 

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
        const formattedDate = selectedDate.toISOString().split('T')[0];
        const fileName = `B${formattedDate}.json`;
        const response = await fetch(`/data/${fileName}.json`);
        
        if (!response.ok) {
          console.warn(`File not found or error fetching: /data/${fileName}.json. Status: ${response.status}`);
          setTotalNews(0);
          setTotalPub(0);
          setTotalEvent(0);
          setDistributionData([]);
          setTrendingTopics([]);
          setGeoMapData([]);
          return;
        }
        
        const data = await response.json();
        setTotalNews(data.totalNews);
        setTotalPub(data.totalPublishers);
        setTotalEvent(data.totalEvents);
        setGeoMapData(data.geoMapChart);

        if (data.distributionChart) {
          setDistributionData(data.distributionChart);
          setTrendingTopics(data.distributionChart);
        } else {
          setDistributionData([]);
          setTrendingTopics([]);
        }
        
      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalNews(0);
        setTotalPub(0);
        setTotalEvent(0);
        setDistributionData([]);
        setTrendingTopics([]);
        setGeoMapData([]);
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
        <h1>Business Dashboard</h1>
        <p>{currentDate}</p>
      </div>
      <div className="p-6 flex gap-10">
        <StatNews title="Total News" value={totalNews} />
        <StatPub title="Publishers" value={totalPub} />
        <StatEvent title="Total Event" value={totalEvent} />
        <SliceDate
          title="Date Slicer"
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="p-6 flex gap-10">
        <PieChart rawData={distributionData} />
        <TrendingTopic distributionChart={trendingTopics} />
      </div>
      <div className="p-6 flex gap-10">
        <GeoMap data={geoMapData} />
      </div>
    </div>
  );
};

export default DailyBusiness;