import React, { useState, useEffect } from "react";
import "chart.js/auto";
import StatNews from "../ScoreCard/StatNews";
import StatPub from "../ScoreCard/StatPublishers";
import StatEvent from "../ScoreCard/StatEvent";
import MonthlySlicer from "../Slicer/SlicerMonthly";
import TrendingTopic from "../Charts/TrendingTopicVer2";
import GeoMap from "../Charts/GeoMapGoogle";
import PieChart from "../Charts/PieChart";
import KeywordChart from "../Charts/BarChart";

const MonthlyTechnology = () => {
  const [totalNews, setTotalNews] = useState(0);
  const [totalPub, setTotalPub] = useState(0);
  const [totalEvent, setTotalEvent] = useState(0);
  const [currentMonthYear, setCurrentMonthYear] = useState("");
  const [distributionData, setDistributionData] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [geoMapData, setGeoMapData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date(); 
  });
  const [MonthlyKeywordData, setMonthlyKeywordData] = useState([]); 

  const getFormattedMonthYear = (date) => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  useEffect(() => {
    setCurrentMonthYear(getFormattedMonthYear(selectedDate));
  }, [selectedDate]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");

        // Penamaan file untuk bulanan: YYYY-MM.json
        const fileName = `T${year}-${month}.json`;

        const response = await fetch(`/data/${fileName}`);
        
        if (!response.ok) {
          console.warn(`File not found or error fetching: /data/${fileName}. Status: ${response.status}`);
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


        if (data.monthlyKeywordData) {
          setMonthlyKeywordData(data.monthlyKeywordData);
        } else {
          setMonthlyKeywordData([]);
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
    const newDate = new Date(date.getFullYear(), date.getMonth(), 1); 
    setSelectedDate(newDate);
    localStorage.setItem("selectedMonth", newDate.toISOString()); 
  };

  return (
    <div>
      <div className="header-content">
        <h1>Technology Dashboard</h1> 
        <p>{currentMonthYear}</p> 
      </div>
      <div className="p-6 flex gap-10">
        <StatNews title="Total News" value={totalNews} />
        <StatPub title="Publishers" value={totalPub} />
        <StatEvent title="Total Event" value={totalEvent} />
        <MonthlySlicer
          selectedDate={selectedDate}
          onMonthChange={handleDateChange} 
        />
      </div>
      <div className="p-6 flex gap-10">
        <PieChart rawData={distributionData} />
        <TrendingTopic distributionChart={trendingTopics} />
      </div>
      <div className="p-6 flex gap-10">
        <KeywordChart keywordData={MonthlyKeywordData} filterType="monthly"/>
      </div>
      <div className="p-6 flex gap-10">
        <GeoMap data={geoMapData} />
      </div>
    </div>
  );
};

export default MonthlyTechnology;