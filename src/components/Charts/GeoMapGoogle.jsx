import React from "react";
import { Chart } from "react-google-charts";

const GeoMap = ({ data = [] }) => {
  const chartData = [
    ["Country", "Article Count"],
    ...data.map(({ country, articleCount }) => [country, articleCount]),
  ];

  const options = {
    backgroundColor: "transparent",
    datalessRegionColor: "#f5f5f5",
    defaultColor: "#f5f5f5",
    legend: { textStyle: { color: "#333", fontSize: 12 } },
    colorAxis: {
      values: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 3000],
      colors: [
        "#fef2f2", // red-50
        "#fee2e2", // red-100
        "#fecaca", // red-200
        "#fca5a5", // red-300
        "#f87171", // red-400
        "#ef4444", // red-500
        "#dc2626", // red-600
        "#b91c1c", // red-700
        "#991b1b", // red-800
        "#7f1d1d", // red-900
        "#450a0a", // red-950
      ],
    },
  };

  return (
    <div className="w-full h-[700px] bg-white shadow-[2px_0_5px_rgba(0,0,0,0.1)] p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-20">Global Article Distribution</h2>
      <div className="relative z-0">
      <Chart
        chartType="GeoChart"
        max-width="100%"
        height="630px"
        data={chartData}
        options={options}
      />
      </div>
    </div>
  );
};

export default GeoMap;
