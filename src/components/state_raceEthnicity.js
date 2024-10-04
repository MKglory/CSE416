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
import nyRaceEthnicityData from '../data/NY_Race_and_Ethnicity_2022.json'; // Import New York race and ethnicity data

import arRaceEthnicityData from '../data/AR_Race_and_Ethnicity_2022.json'; // Import Arkansas race and ethnicity data

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function RaceEthnicityContent({ selectedState }) {
  const [filteredRaceData, setFilteredRaceData] = useState([]);

  useEffect(() => {
    let filteredData = [];

    // Filter the data based on selectedState (e.g., 'NY' or 'AR')
    if (selectedState === 'NY') {
      filteredData = nyRaceEthnicityData.filter(
        (item) => item.Geography === 'New York'
      );
    } else if (selectedState === 'AR') {
      filteredData = arRaceEthnicityData.filter(
        (item) => item.Geography === 'Arkansas'
      );
    }

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
        font: {
          size: 20,
        },
      },
      // Disable the datalabels plugin if it's present
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Race and Ethnicity',
          font: {
            size: 20,
          },
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
          font: {
            size: 12,
          },
        },
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
    <div>
      {/* <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} Race and Ethnicity Data</h2> */}
      <Bar data={data} options={options} height={310}/> {/* Set height here */}
    </div>
  );
}

export default RaceEthnicityContent;
