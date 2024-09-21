// src/components/MainContent.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// register component
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function MainContent({ selectedState }) {
  const data = {
    labels: ['poor', 'lower middle', 'middle', 'upper middle', 'rich'],
    datasets: [
      {
        label: 'population distribution',
        data: [50000, 100000, 150000, 80000, 60000],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} population distribution`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'income level',
        },

        type: 'category',
      },
      y: {
        title: {
          display: true,
          text: 'population',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} main contain</h2>
      <p>
        here is the population distribution and election result of {selectedState === 'NY' ? 'New York' : 'Arkansas'} .
      </p>

      <Bar data={data} options={options} />
    </div>
  );
}

export default MainContent;
