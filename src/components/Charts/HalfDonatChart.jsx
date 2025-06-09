import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ChartDataLabels);
ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({ rawData }) => {
  const totalArticles = rawData.reduce((sum, item) => sum + item.articleCount, 0);

  const sortedData = rawData && rawData.length > 0
    ? [...rawData]
        .sort((a, b) => b.articleCount - a.articleCount)
        .slice(0, 5)
        .map(item => ({
          ...item,
          percentage: totalArticles > 0 ? (item.articleCount / totalArticles) * 100 : 0
        }))
    : [
        { title: 'No Data', articleCount: 1, percentage: 100 },
        { title: '', articleCount: 0, percentage: 0 },
        { title: '', articleCount: 0, percentage: 0 },
        { title: '', articleCount: 0, percentage: 0 },
        { title: '', articleCount: 0, percentage: 0 },
      ];

  const data = {
    labels: sortedData.map(item => item.title),
    datasets: [
      {
        data: sortedData.map(item => item.articleCount),
        backgroundColor: ['#A58EFF', '#FFB2B2', '#5DD8D4', '#FFB84C', '#4D88FF'],
        borderWidth: 1,
      }
    ]
  };

  const options = {
    cutout: '70%',
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const index = context.dataIndex;
            const item = sortedData[index];
            const title = item.title || 'Unknown';
            const count = item.articleCount;
            const percentage = item.percentage ?? 0;

            return [
              `Title: ${title}`,
              `Article Count: ${count.toLocaleString()}`,
              `Percentage: ${percentage.toFixed(2)}%`
            ];
          },
          title: function () {
            return '';
          }
        }
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14
        },
        formatter: (value, context) => {
          const index = context.dataIndex;
          const percentage = sortedData[index].percentage ?? 0;
          return `${percentage.toFixed(1)}%`;
        }
      }
    }   
  };

  return (
    <div className="w-[586px] h-[390px] bg-white shadow-[2px_0_5px_rgba(0,0,0,0.1)] p-4 rounded-lg">
      <h2 className="text-xl font-bold whitespace-nowrap">Article Distribution</h2>
      <div className="flex-1 flex items-center justify-center h-full">
        <div className="w-[780px] h-[590px] mt-[40px]">
          <Doughnut data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
