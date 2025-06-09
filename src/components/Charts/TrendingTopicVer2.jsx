import React from "react";

const TrendingTopic = ({ distributionChart = [] }) => {
  const customColors = ['#A58EFF', '#FFB2B2', '#5DD8D4', '#FFB84C', '#4D88FF'];

  return (
    <div className="w-[738px] h-[390px] bg-white mx-auto p-4 rounded-lg shadow-md">
      {/* Title Tetap */}
      <h2 className="text-xl font-bold mb-4">Trending Topics</h2>

      {/* Area scroll hanya untuk list */}
      <div className="space-y-4 overflow-y-auto max-h-[320px] pr-2 ">
        {distributionChart.length === 0 ? (
          <p className="text-sm text-gray-500">No topics available.</p>
        ) : (
          distributionChart.slice(0, 10).map((topic, index) => (
            <div key={index} className="border-b border-red-400 pb-2 pt-2">
              <div className="flex items-start gap-3">
                <span
                  className={`font-bold px-3 py-1 rounded-full text-xs ${
                    index >= 5 ? "bg-red-100 text-red-700" : ""
                  }`}
                  style={{
                    backgroundColor: index < 5 ? customColors[index] : undefined,
                    color: index < 5 ? "#fff" : undefined,
                  }}
                >
                  {index + 1}
                </span>
                <div>
                  <a
                    href={topic.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-medium leading-snug text-black hover:text-black visited:text-black break-words whitespace-normal"
                  >
                    {topic.title}
                  </a>
                  <div className="mt-1 ml-[2.25rem] text-xs text-gray-600">
                    {new Date(topic.dateTimePub).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrendingTopic;
