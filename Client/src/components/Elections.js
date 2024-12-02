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

function Elections({ selectedState, selectedContent }) {
  const [chartData_election, setChartData_election] = useState(null);
  const [chartData_representatives, setChartData_representatives] = useState(null);
  const [loading, setLoading] = useState(true);

  const ElectionsDataRequest = async () => {
    try {
      const electionResponse = await axios.get(`http://localhost:8080/elections/${selectedState.toLowerCase()}Data`);
      const colors = electionResponse.data.colors
      const electionData = electionResponse.data.data; 
      const districts = electionData.districts;
      const districtsArray = Object.keys(districts); // Converts the object to an array of its values
      const democraticVotes = districtsArray.map(district => districts[district]['Democracy'] || 0);
      const republicanVotes = districtsArray.map(district => districts[district]['Republican'] || 0);
      const totalDemocraticVotes = democraticVotes.reduce((acc, votes) => acc + votes, 0);
      const totalRepublicanVotes = republicanVotes.reduce((acc, votes) => acc + votes, 0);
      // Set Chart Data for Elections
      setChartData_election({
        labels: ['Election Votes'],
        datasets: [
          {
            label: 'Democratic',
            data: [totalDemocraticVotes],
            backgroundColor: colors.democraticColor, // Blue
          },
          {
            label: 'Republican',
            data: [totalRepublicanVotes],
            backgroundColor: colors.republicanColor, // Red
          }
        ]
      });

      // Process Representatives Seats
      setChartData_representatives({
        labels: ["Representatives"],
        datasets: [
          {
            label: 'Democratic',
            data: [electionData['democraticSeats']],
            backgroundColor: colors.democraticColor, // Blue
          },
          {
            label: 'Republican',
            data: [electionData['republicanSeats']],
            backgroundColor: colors.republicanColor, // Red
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
  }, [selectedState, selectedContent]);

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
        {chartData_election ? <Bar data={chartData_election} options={options}/> : "Loading election data..."}
      </div>
      <div style={{ height: '30vh' }}>
        {chartData_representatives ? <Bar data={chartData_representatives} options={options}/> : "Loading representative data..."}
      </div>
    </div>
  );
}

export default Elections;