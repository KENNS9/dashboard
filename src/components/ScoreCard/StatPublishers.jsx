import React from "react";
import { FaRegBuilding } from "react-icons/fa"; 

const StatPub = ({ title, value }) => {
  return (
    <div className="bg-teal-400 text-white w-64 h-28 p-4 rounded-xl flex justify-between items-center shadow-md">
      <div className="flex flex-col items-start">
        <FaRegBuilding className="text-5xl text-white" />
        <p className="text-base font-bold whitespace-nowrap">{title}</p>
      </div>

      <p className="text-4xl font-bold">{(value || 0).toLocaleString("id-ID")}</p>
    </div>
  );
};

export default StatPub;
