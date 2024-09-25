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
import raceEthnicityData from '../data/Race_and_Ethnicity_2022.json'; // Import race and ethnicity data

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function RaceEthnicityContent({ selectedState }) {
  const [filteredRaceData, setFilteredRaceData] = useState([]);

  useEffect(() => {
    // Filter the data based on selectedState (e.g., 'New York' or 'Arkansas')
    const filteredData = raceEthnicityData.filter(
      (item) => item.Geography === (selectedState === 'NY' ? 'New York' : 'Arkansas')
    );
    setFilteredRaceData(filteredData);
  }, [selectedState]);

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
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} Race and Ethnicity Distribution`,
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
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} Race and Ethnicity Data</h2>
      <p>
        Below is the race and ethnicity population distribution of {selectedState === 'NY' ? 'New York' : 'Arkansas'}.
      </p>

      <Bar data={data} options={options} />
    </div>
  );
}

export default RaceEthnicityContent;
