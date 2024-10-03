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
  const year = 2023; // Replace with the actual year

  // Data for New York and Arkansas
  const stateData = {
    NY: {
      labels: ['White', 'Black or African American', 'Hispanic or Latino', 'Asian', 'Other'],
      datasets: [
        {
          label: 'Number of Representatives',
          data: [100, 30, 15, 5, 0], // Hypothetical data for New York
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    },
    AR: {
      labels: ['White', 'Black or African American', 'Hispanic or Latino', 'Asian', 'Other'],
      datasets: [
        {
          label: 'Number of Representatives',
          data: [90, 25, 10, 3, 0], // Hypothetical data for Arkansas
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
      <p>
        Below is the race and ethnicity distribution of the representatives in the {selectedState === 'NY' ? 'New York' : 'Arkansas'} House of Representatives.
      </p>
      <Bar data={stateData[selectedState]} options={options} />
    </div>
  );
}

export default NYHouseEthnicityContent;