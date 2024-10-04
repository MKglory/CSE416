import React, { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ScatterController,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // Import the data labels plugin

// Register Chart.js components
ChartJS.register(
  ScatterController,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels // Register the data labels plugin
);

function VoteGapAnalysisContent({ selectedState }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    // Dummy data simulating vote gaps based on percent Latino population
    const newYorkData = {
      labels: Array.from({ length: 1138 }, (_, i) => `Precinct ${i + 1}`),
      datasets: [
        {
          label: 'New York Candidate 1',
          data: Array.from({ length: 1138 }, () => ({
            x: Math.random() * 100,
            y: 50 + Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1),
          })),
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
          borderColor: 'rgba(255, 99, 132, 1)',
          type: 'scatter',
          datalabels: { display: false }, // Disable data labels for this dataset
        },
        {
          label: 'New York Candidate 2',
          data: Array.from({ length: 1138 }, () => ({
            x: Math.random() * 100,
            y: 50 + Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1),
          })),
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue
          borderColor: 'rgba(54, 162, 235, 1)',
          type: 'scatter',
          datalabels: { display: false }, // Disable data labels for this dataset
        },
        {
          label: 'Trend Line Candidate 1',
          data: Array.from({ length: 100 }, (_, i) => ({
            x: i,
            y: 75 - (i * 0.5), // Simulated trend line equation
          })),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'transparent', // Ensure background is transparent
          type: 'line',
          fill: false,
          datalabels: { display: false }, // Disable data labels for this dataset
        },
        {
          label: 'Trend Line Candidate 2',
          data: Array.from({ length: 100 }, (_, i) => ({
            x: i,
            y: 25 + (i * 0.75), // Simulated trend line equation
          })),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'transparent', // Ensure background is transparent
          type: 'line',
          fill: false,
          datalabels: { display: false }, // Disable data labels for this dataset
        },
      ],
    };

    const arkansasData = {
      labels: Array.from({ length: 1138 }, (_, i) => `Precinct ${i + 1}`),
      datasets: [
        {
          label: 'Arkansas Candidate 1',
          data: Array.from({ length: 1138 }, () => ({
            x: Math.random() * 100,
            y: 50 + Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1),
          })),
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
          borderColor: 'rgba(255, 99, 132, 1)',
          type: 'scatter',
          datalabels: { display: false }, // Disable data labels for this dataset
        },
        {
          label: 'Arkansas Candidate 2',
          data: Array.from({ length: 1138 }, () => ({
            x: Math.random() * 100,
            y: 50 + Math.random() * 50 * (Math.random() > 0.5 ? 1 : -1),
          })),
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue
          borderColor: 'rgba(54, 162, 235, 1)',
          type: 'scatter',
          datalabels: { display: false }, // Disable data labels for this dataset
        },
        {
          label: 'Trend Line Candidate 1',
          data: Array.from({ length: 100 }, (_, i) => ({
            x: i,
            y: 70 - (i * 0.4), // Simulated trend line for Arkansas Candidate 1
          })),
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'transparent', // Ensure background is transparent
          type: 'line',
          fill: false,
          datalabels: { display: false }, // Disable data labels for this dataset
        },
        {
          label: 'Trend Line Candidate 2',
          data: Array.from({ length: 100 }, (_, i) => ({
            x: i,
            y: 30 + (i * 0.65), // Simulated trend line for Arkansas Candidate 2
          })),
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'transparent', // Ensure background is transparent
          type: 'line',
          fill: false,
          datalabels: { display: false }, // Disable data labels for this dataset
        },
      ],
    };

    // Set chart data based on the selected state
    if (selectedState === 'NY') {
      setChartData(newYorkData);
    } else if (selectedState === 'AR') {
      setChartData(arkansasData);
    }
  }, [selectedState]);

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>Vote Gap Analysis for {selectedState === 'NY' ? 'New York' : 'Arkansas'} Candidates</h2>
      <p>
        Below is the vote distribution for {selectedState === 'NY' ? 'New York Candidate 1 and Candidate 2' : 'Arkansas Candidate 1 and Candidate 2'} based on Percent Latino population.
      </p>

      <Scatter
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: `Vote Gap Analysis by Percent Latino for ${selectedState === 'NY' ? 'New York' : 'Arkansas'}`,
            },
            datalabels: {
              display: false, // Disable all data labels globally for this chart
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Percent Latino',
              },
              beginAtZero: true,
              max: 100,
            },
            y: {
              title: {
                display: true,
                text: 'Vote Percentage',
              },
              min: 0,
              max: 100,
            },
          },
        }}
      />
    </div>
  );
}

export default VoteGapAnalysisContent;
