import React from "react";
import { FaSearch } from "react-icons/fa";

const StatKeyword = ({ title, value }) => {
  return (
    <div className="bg-pink-400 text-white w-64 h-28 p-4 rounded-xl flex justify-between items-center shadow-md">
      <div className="flex flex-col items-start">
        <FaSearch className="text-4xl text-white" />
        <p className="text-sm font-medium whitespace-nowrap">{title}</p>
      </div>
      <p className="text-3xl font-bold">{(value || 0).toLocaleString("id-ID")}</p>
    </div>
  );
};

export default StatKeyword;
