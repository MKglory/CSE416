import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import nyRaceEthnicityData from '../data/NY_Race_and_Ethnicity_2022.json'; // Import NY race and ethnicity data

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function NYHouseEthnicityContent() {
  const [filteredRaceData, setFilteredRaceData] = useState([]);

  useEffect(() => {
    // Filter the data for New York House of Representatives
    const filteredData = nyRaceEthnicityData.filter(
      (item) => item.Geography === 'New York House of Representatives'
    );
    setFilteredRaceData(filteredData);
  }, []);

  const data = {
    labels: filteredRaceData.map((item) => item.Race), // Extract race names
    datasets: [
      {
        label: 'Population',
        data: filteredRaceData.map((item) => item.Population), // Extract population data
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
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
        text: 'New York House of Representatives Race and Ethnicity Distribution',
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
          text: 'Population',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>New York House of Representatives Race and Ethnicity Data</h2>
      <p>Below is the race and ethnicity population distribution of the New York House of Representatives.</p>
      <Bar data={data} options={options} />
    </div>
  );
}

export default NYHouseEthnicityContent;
