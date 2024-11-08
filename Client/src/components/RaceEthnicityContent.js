import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function RaceEthnicityContent({ selectedState }) {
  const [filteredRaceData, setFilteredRaceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/raceEthnicityData/${selectedState}`);
        setFilteredRaceData(response.data);
      } catch (error) {
        console.error('Error fetching race and ethnicity data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedState]);

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading data...</p>
      </div>
    );
  }

  if (filteredRaceData.length === 0) {
    return <p>No data available for the selected state.</p>;
  }

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
      <Bar data={data} options={options} height={350} />
    </div>
  );
}

export default RaceEthnicityContent;


