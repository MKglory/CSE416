import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import ny_elections from '../data/NewYork/ny_elections.json'

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

function Elections({ selectedState }) {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const electionData = ny_elections;
    const districts = Object.keys(ny_elections);

    const democraticVotes = districts.map(district => electionData[district]['Democracy'] || 0);
    const republicanVotes = districts.map(district => electionData[district]['Republican'] || 0);

    const totalDemocraticVotes = democraticVotes.reduce((acc, votes) => acc + votes, 0);
    const totalRepublicanVotes = republicanVotes.reduce((acc, votes) => acc + votes, 0);

    setChartData({
      labels: ['Election Votes'], // Just one label for the x-axis
      datasets: [
        {
          label: 'Democratic',
          data: [totalDemocraticVotes], // Data for Democratic votes
          backgroundColor: 'rgba(0, 0, 255, 0.6)', // Democratic color
        },
        {
          label: 'Republican',
          data: [totalRepublicanVotes], // Data for Republican votes
          backgroundColor: 'rgba(255, 0, 0, 0.6)', // Republican color
        }
      ]
    });
  }, [selectedState]);

  const options = {
    indexAxis: 'y',
    plugins: {
      datalabels: {
        display: true,
        color: 'black', // Color of the data labels
        align: 'center', // Aligns the label inside the bar
        anchor: 'center', // Anchors the label position
        font: {
          size: 14, // Font size for the data label
          family: "'Arial', sans-serif", // Font family
          style: 'bold', // Font style (optional)
        },
        formatter: function (value) {
          return value.toLocaleString(); // Formats the number with commas
        }
      },
      legend: {
        display: true,
        position: 'top', // Moves the legend to the top
        labels: {
          boxWidth: 20, // Adjust the width of the legend boxes
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return value.toLocaleString(); // Add commas to the values
          },
          font: {
            size: 12, // Custom font size for x-axis labels
            family: 'Arial, sans-serif', // Custom font family for x-axis labels
          }
        },
      },
      y: {
        ticks: {
          font: {
            size: 14, // Custom font size for y-axis labels
            family: "'Arial', sans-serif", // Custom font family for y-axis labels
            style: 'bold', // Font style for y-axis labels
          },
        },
      },
    },
    maintainAspectRatio: false, // Allows you to control the size
  };

  
  

  return (
    <div>
      <div style={{height: '30vh'}}>
        {chartData && <Bar data={chartData} options={options}/>}
      </div>
      <div style={{height: '30vh'}}>
        {chartData && <Bar data={chartData} options={options}/>}
      </div>
    </div>
  );
}
export default Elections;
