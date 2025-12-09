import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UsageRankingChart = ({ resources }) => {
  if (!resources || resources.length === 0) {
    return (
      <div className="flex items-center justify-center h-full w-full text-slate-500 text-sm">
        No usage data available.
      </div>
    );
  }

  // Sort by usage and take top 5
  const topResources = [...resources].sort((a, b) => b.usageCount - a.usageCount).slice(0, 5);

  const data = {
    labels: topResources.map(r => r.name.split(' ')[0]), // Shorten names
    datasets: [
      {
        label: 'Total Uses',
        data: topResources.map(r => r.usageCount),
        backgroundColor: [
          'rgba(56, 189, 248, 0.8)', // Cyan
          'rgba(232, 121, 249, 0.8)', // Pink
          'rgba(192, 132, 252, 0.8)', // Purple
          'rgba(190, 242, 100, 0.8)', // Lime
          'rgba(56, 189, 248, 0.5)',
        ],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
      y: { display: false }, // Clean look
    },
  };

  return <Bar options={options} data={data} />;
};

export default UsageRankingChart;