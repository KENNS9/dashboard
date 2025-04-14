import React from "react";
import { FaRegNewspaper } from "react-icons/fa";

const StatNews = ({ title, value }) => {
  return (
    <div className="bg-blue-400 text-white w-64 h-28 p-4 rounded-xl flex justify-between items-center shadow-md">
      <div className="flex flex-col items-start">
        <FaRegNewspaper className="text-5xl text-white" />
        <p className="text-base font-bold whitespace-nowrap">{title}</p>
      </div>

      <p className="text-4xl font-bold">{value.toLocaleString("id-ID")}</p>
    </div>
  );
};

export default StatNews;
