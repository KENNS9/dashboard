import React, {useState, useEffect } from "react";
import "chart.js/auto";
import "./Dashboard.css";
import Navbar from '../Navbar/navbar'; 
// import Sidebar from "../SideBar/sidebar";
import StatNews from "../ScoreCard/StatNews";
import StatPub from "../ScoreCard/StatPublishers";

const DashboardContent = () => {
  const [totalNews, setTotalNews] = useState(0);

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

  const[totalPub, setTotalPub] = useState(0);

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
  },[]);

  return (
    <div>
      <Navbar/> 
      {/* <Sidebar/> */}
      <div className="p-4 flex gap-10">
        <StatNews title="Total News" value={totalNews}/>
        <StatPub title="Publishers" value={totalPub}/>
      </div>
    </div>
  );
};

export default DashboardContent;
