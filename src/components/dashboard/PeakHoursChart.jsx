import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend);

const PeakHoursChart = () => {
  const data = {
    labels: ['8am', '10am', '12pm', '2pm', '4pm', '6pm', '8pm'],
    datasets: [
      {
        label: 'Lab Usage Activity',
        data: [12, 45, 60, 35, 70, 50, 20],
        borderColor: '#38bdf8', // Tailwind cyan-400
        backgroundColor: 'rgba(56, 189, 248, 0.2)', // Translucent fill
        tension: 0.4, // Smooth curves
        pointBackgroundColor: '#fff',
        pointBorderColor: '#38bdf8',
        pointRadius: 4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1e293b',
        bodyColor: '#1e293b',
        borderColor: '#38bdf8',
        borderWidth: 1,
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#64748b' } },
      y: { 
        grid: { color: 'rgba(200, 200, 200, 0.2)', borderDash: [5, 5] }, 
        ticks: { color: '#64748b' } 
      },
    },
  };

  return <Line options={options} data={data} />;
};

export default PeakHoursChart;