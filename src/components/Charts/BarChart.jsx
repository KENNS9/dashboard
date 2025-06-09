import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';

export default function KeywordChart({ keywordData = [], filterType = 'weekly' }) {

  const [range, setRange] = useState(filterType === 'weekly' ? 7 : (filterType === 'monthly' ? 4 : 12)); // Default range
  const maxRange = keywordData.length > 0 ? keywordData.length : (filterType === 'weekly' ? 7 : (filterType === 'monthly' ? 5 : 12)); // Max range sesuai type
  const currentRange = Math.min(range, maxRange);

  const mergedData = useMemo(() => {
    const filtered = keywordData.slice(0, currentRange);
    const merged = {};

    filtered.forEach(({ data }) => { // keywordData[i].data (misal hari/minggu/bulan)
      data.forEach(({ title, count }) => {
        if (!merged[title]) merged[title] = 0;
        merged[title] += count;
      });
    });

    let result = Object.entries(merged).map(([title, count]) => ({ title, count }));

    result.sort((a, b) => b.count - a.count);
    result = result.slice(0, 10);
    return result;
  }, [keywordData, currentRange, filterType]); 

  const getFilterLabel = () => {
    if (filterType === 'weekly') {
      return 'Tampilkan data: ';
    } else if (filterType === 'monthly') {
      return 'Tampilkan data: ';
    } else if (filterType === 'yearly') {
      return 'Tampilkan data: ';
    }
    return 'Tampilkan data: ';
  };

  // Opsi dropdown yang berbeda
  const getFilterOptions = () => {
    if (filterType === 'weekly') {
      return Array.from({ length: maxRange }, (_, i) => i + 1).map((d) => (
        <option key={d} value={d}>{`Hari ke-1 hingga ${d}`}</option>
      ));
    } else if (filterType === 'monthly') {
      // Asumsi ada 5 minggu dalam sebulan maksimal untuk filter
      const maxWeeks = maxRange; // maxRange akan menjadi jumlah minggu sebenarnya dari data
      return Array.from({ length: maxWeeks }, (_, i) => i + 1).map((d) => (
        <option key={d} value={d}>{`Minggu ke-1 hingga ${d}`}</option>
      ));
    } else if (filterType === 'yearly') {
      // Asumsi ada 12 bulan dalam setahun maksimal untuk filter
      const maxMonths = maxRange; // maxRange akan menjadi jumlah bulan sebenarnya dari data
      return Array.from({ length: maxMonths }, (_, i) => i + 1).map((d) => (
        <option key={d} value={d}>{`Bulan ke-1 hingga ${d}`}</option>
      ));
    }
    return null;
  };

  return (
    <div className="w-full h-[530px] bg-white shadow-[2px_0_5px_rgba(0,0,0,0.1)] p-4 rounded-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Keyword Chart</h2>

        <label className="block mb-2">
          {getFilterLabel()}
          <select
            className="ml-2 border rounded p-1"
            value={currentRange}
            onChange={(e) => setRange(Number(e.target.value))}
          >
            {getFilterOptions()}
          </select>
        </label>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={mergedData}
            margin={{ top: 10, right: 70, left: 50, bottom: 10 }}
          >
            <XAxis type="number" />
            <YAxis dataKey="title" type="category" />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" barSize={20}>
              <LabelList dataKey="count" position="right" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}