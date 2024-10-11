import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import ny_elections from '../data/NewYork/ny_elections.json';
import ny_representatives_seats from '../data/NewYork/ny_representatives';
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

function Elections({ selectedState }) {
  const [chartData_election, setChartData_election] = useState(null);
  const [chartData_representatives, setChartData_representatives] = useState(null);
  const [loading, setLoading] = useState(true);

  const ElectionsDataRequest = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/elections/${selectedState.toLowerCase()}Data`);
      const electionData = response.data; // Adjust based on your API response structure
      const representatives = ny_representatives_seats; // Adjust based on your API response structure

      // Process Election Votes
      const districts = Object.keys(electionData);
      const democraticVotes = districts.map(district => electionData[district]['Democracy'] || 0);
      const republicanVotes = districts.map(district => electionData[district]['Republican'] || 0);
      const totalDemocraticVotes = democraticVotes.reduce((acc, votes) => acc + votes, 0);
      const totalRepublicanVotes = republicanVotes.reduce((acc, votes) => acc + votes, 0);

      // Set Chart Data for Elections
      setChartData_election({
        labels: ['Election Votes'],
        datasets: [
          {
            label: 'Democratic',
            data: [totalDemocraticVotes],
            backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue
          },
          {
            label: 'Republican',
            data: [totalRepublicanVotes],
            backgroundColor: 'rgba(255, 0, 0, 0.6)', // Red
          }
        ]
      });

      // Process Representatives Seats
      setChartData_representatives({
        labels: ["Representatives"],
        datasets: [
          {
            label: 'Democratic',
            data: [representatives['party_distribution']['Democratic']['seats']],
            backgroundColor: 'rgba(0, 0, 255, 0.6)', // Blue
          },
          {
            label: 'Republican',
            data: [representatives['party_distribution']['Republican']['seats']],
            backgroundColor: 'rgba(255, 0, 0, 0.6)', // Red
          }
        ]
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching election data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    ElectionsDataRequest();
  }, [selectedState]);

  const options = {
    indexAxis: 'y',
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        align: 'center',
        anchor: 'center',
        textAlign: 'center',
        font: {
          size: 14,
          family: "'Arial', sans-serif",
        },
        formatter: function (value) {
          return value.toLocaleString();
        }
      },
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 20,
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString();
          },
          font: {
            size: 12,
            family: 'Arial, sans-serif',
          }
        },
      },
      y: {
        ticks: {
          font: {
            size: 14,
            family: "'Arial', sans-serif",
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return <div>Loading data...</div>;
  }
  return (
    <div>
      <div style={{ height: '30vh' }}>
        {chartData_election ? <Bar data={chartData_election} options={options} /> : "Loading election data..."}
      </div>
      <div style={{ height: '30vh' }}>
        {chartData_representatives ? <Bar data={chartData_representatives} options={options} /> : "Loading representative data..."}
      </div>
    </div>
  );
}

export default Elections;