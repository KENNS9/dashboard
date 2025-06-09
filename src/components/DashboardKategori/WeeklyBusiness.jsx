import React, { useState, useEffect } from "react";
import "chart.js/auto";
import StatNews from "../ScoreCard/StatNews";
import StatPub from "../ScoreCard/StatPublishers";
import StatEvent from "../ScoreCard/StatEvent";
import WeeklySlicer from "../Slicer/SliceWeek";
import TrendingTopic from "../Charts/TrendingTopicVer2";
import GeoMap from "../Charts/GeoMapGoogle";
import PieChart from "../Charts/PieChart";
import KeywordChart from "../Charts/BarChart";

const WeeklyBusiness = () => {
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
  const [weeklyKeywordData, setWeeklyKeywordData] = useState([]);

  const getWeekNumberInMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfMonth = date.getDate();
  const firstDayWeekday = firstDay.getDay(); 
  return Math.ceil((dayOfMonth + firstDayWeekday) / 7);
};

const getOrdinalSuffix = (num) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const v = num % 100;
  return suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0];
};

const getFormattedWeekLabel = (date) => {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const weekNum = getWeekNumberInMonth(date);
  const ordinal = getOrdinalSuffix(weekNum);
  const month = months[date.getMonth()];

  return `${weekNum}${ordinal} week of ${month}`;
};

  useEffect(() => {
    setCurrentDate(getFormattedWeekLabel(selectedDate));
  }, [selectedDate]);

  // Fetch data
  useEffect(() => {
  const fetchData = async () => {
  try {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); 
    const week = String(getWeekNumberInMonth(selectedDate)).padStart(2, "0"); 

    // Penamaan file: YYYY-MM-WNN.json
    const fileName = `B${year}-${month}-W${week}.json`;

    const response = await fetch(`/data/${fileName}`);      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    const data = await response.json();

    setTotalNews(data.totalNews);
    setTotalPub(data.totalPublishers);
    setTotalEvent(data.totalEvents);
    setGeoMapData(data.geoMapChart);

    if (data.distributionChart) {
      setDistributionData(data.distributionChart);
      setTrendingTopics(data.distributionChart);
    }

    if (data.weeklyKeywordData) {
      setWeeklyKeywordData(data.weeklyKeywordData);
    } else {
      setWeeklyKeywordData([]);
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    setTotalNews(0);
    setTotalPub(0);
    setTotalEvent(0);
    setDistributionData([]);
    setTrendingTopics([]);
    setGeoMapData([]);
    setWeeklyKeywordData([]);
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
        <WeeklySlicer 
          selectedDate={selectedDate}  
          onWeekChange={handleDateChange}
        />
      </div>
      <div className="p-6 flex gap-10">
        <PieChart rawData={distributionData} />
        <TrendingTopic distributionChart={trendingTopics} />
      </div>
      <div className="p-6 flex gap-10">
        <KeywordChart keywordData={weeklyKeywordData}/>
      </div>
      <div className="p-6 flex gap-10">
        <GeoMap data={geoMapData} />
      </div>

    </div>
  );
};

export default WeeklyBusiness;