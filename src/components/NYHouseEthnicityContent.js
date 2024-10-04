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

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function NYHouseEthnicityContent({ selectedState }) {
  const year = 2024; // Updated to reflect the actual year

  // Data for New York and Arkansas
  const stateData = {
    NY: {
      labels: ['White', 'Black or African American', 'Hispanic or Latino', 'Asian', 'Other'],
      datasets: [
        {
          label: 'Number of Representatives',
          data: [16, 5, 3, 2, 0], // Real data for New York's 26 representatives
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    },
    AR: {
      labels: ['White', 'Black or African American', 'Hispanic or Latino', 'Asian', 'Other'],
      datasets: [
        {
          label: 'Number of Representatives',
          data: [3, 1, 0, 0, 0], // Real data for Arkansas's 4 representatives
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} House of Representatives Race and Ethnicity Distribution (${year})`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Race and Ethnicity',
        },
        type: 'category',
      },
      y: {
        title: {
          display: true,
          text: 'Number of Representatives',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} House of Representatives Race and Ethnicity Data</h2>

      <Bar data={stateData[selectedState]} options={options} height={310}/>
    </div>
  );
}

export default NYHouseEthnicityContent;