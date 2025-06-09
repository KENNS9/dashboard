import React, { useState, useEffect } from "react";
import "chart.js/auto";
import StatNews from "../ScoreCard/StatNews";
import StatPub from "../ScoreCard/StatPublishers";
import StatEvent from "../ScoreCard/StatEvent";
import YearlySlicer from "../Slicer/SlicerYearly";
import TrendingTopic from "../Charts/TrendingTopicVer2";
import GeoMap from "../Charts/GeoMapGoogle";
import PieChart from "../Charts/PieChart";
import KeywordChart from "../Charts/BarChart";

const YearlyBusiness = () => {
  const [totalNews, setTotalNews] = useState(0);
  const [totalPub, setTotalPub] = useState(0);
  const [totalEvent, setTotalEvent] = useState(0);
  const [currentYearDisplay, setCurrentYearDisplay] = useState("");
  const [distributionData, setDistributionData] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState([]);
  const [geoMapData, setGeoMapData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); 
  const [yearlyKeywordData, setYearlyKeywordData] = useState([]); 
  const getFormattedYear = (year) => {
    return String(year);
  };

  useEffect(() => {
    setCurrentYearDisplay(getFormattedYear(selectedYear));
  }, [selectedYear]);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const year = selectedYear;
        
        // Penamaan file untuk tahunan: YYYY.json (misal: 2025.json)
        const fileName = `B${year}.json`; 
        const response = await fetch(`/data/${fileName}`);
        
        if (!response.ok) {
          console.warn(`File not found or error fetching: /data/${fileName}. Status: ${response.status}`);
          setTotalNews(0);
          setTotalPub(0);
          setTotalEvent(0);
          setDistributionData([]);
          setTrendingTopics([]);
          setGeoMapData([]);
          setYearlyKeywordData([]);
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

        if (data.yearlyKeywordData) {
          setYearlyKeywordData(data.yearlyKeywordData);
        } else {
          setYearlyKeywordData([]);
        }

      } catch (error) {
        console.error("Error fetching data:", error);
        setTotalNews(0);
        setTotalPub(0);
        setTotalEvent(0);
        setDistributionData([]);
        setTrendingTopics([]);
        setGeoMapData([]);
        setYearlyKeywordData([]);
      }
    };

    fetchData();
  }, [selectedYear]); 

  const handleYearChange = (year) => {
    setSelectedYear(year); 
    localStorage.setItem("selectedYear", String(year)); 
  };

  return (
    <div>
      <div className="header-content">
        <h1>Business Dashboard</h1> 
        <p>{currentYearDisplay}</p> 
      </div>
      <div className="p-6 flex gap-10">
        <StatNews title="Total News" value={totalNews} />
        <StatPub title="Publishers" value={totalPub} />
        <StatEvent title="Total Event" value={totalEvent} />
        <YearlySlicer 
          selectedYear={selectedYear}
          onYearChange={handleYearChange} 
        />
      </div>
      <div className="p-6 flex gap-10">
        <PieChart rawData={distributionData} />
        <TrendingTopic distributionChart={trendingTopics} />
      </div>
      <div className="p-6 flex gap-10">
        <KeywordChart keywordData={yearlyKeywordData} filterType="yearly"/>
      </div>
      <div className="p-6 flex gap-10">
        <GeoMap data={geoMapData} />
      </div>
    </div>
  );
};

export default YearlyBusiness;