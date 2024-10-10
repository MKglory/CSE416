import React, { useEffect, useState } from 'react';
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

// register component
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Elections({ selectedState }) {
  const [chartData_election, setChartData_election] = useState(null);
  const [chartData_representatives, setChartData_representatives] = useState(null);

  useEffect(() => {
    const electionData = ny_elections;
    const districts = Object.keys(ny_elections);
    const democraticVotes = districts.map(district => electionData[district]['Democracy'] || 0);
    const republicanVotes = districts.map(district => electionData[district]['Republican'] || 0);
    const totalDemocraticVotes = democraticVotes.reduce((acc, votes) => acc + votes, 0);
    const totalRepublicanVotes = republicanVotes.reduce((acc, votes) => acc + votes, 0);

    const representatives = ny_representatives_seats;

    setChartData_election({
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
    setChartData_representatives({
      labels: ["Representatives "], // Just one label for the x-axis
      datasets: [
        {
          label: 'Democratic',
          data: [representatives['party_distribution']['Democratic']['seats']], // Data for Democratic votes
          backgroundColor: 'rgba(0, 0, 255, 0.6)', // Democratic color
        },
        {
          label: 'Republican',
          data: [representatives['party_distribution']['Republican']['seats']], // Data for Republican votes
          backgroundColor: 'rgba(255, 0, 0, 0.6)', // Republican color
        }
      ]
    })
  }, [selectedState]);

  const options = {
    indexAxis: 'y',
    plugins: {
      datalabels: {
        display: true,
        color: 'black',
        align: 'center',
        anchor: 'center',
        textAlign: 'center', // Align the text inside the limited space
        font: {
          size: 14,
          family: "'Arial', sans-serif",
        },
        formatter: function (value) {
          return value.toLocaleString(); // Formats the number with commas
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
  

  
  

  return (
    <div>
      <div style={{height: '30vh'}}>
        {chartData_election && <Bar data={chartData_election} options={options}/>}
      </div>
      <div style={{height: '30vh'}}>
        {chartData_representatives && <Bar data={chartData_representatives} options={options}/>}
      </div>
    </div>
  );
}
export default Elections;
