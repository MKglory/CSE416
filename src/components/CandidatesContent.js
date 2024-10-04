import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

function CandidatesContent({ selectedState }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Dummy data for New York and Arkansas candidates
    const newYorkData = [
      {
        candidate: 'New York Person 1',
        data: [
          {
            ethnicity: 'Indian',
            values: [1, 2, 3, 4, 5, 4, 3, 2, 1],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'East Asian',
            values: [3, 4, 5, 6, 7, 6, 5, 4, 3],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            ethnicity: 'Non-Asian',
            values: [5, 6, 7, 8, 9, 8, 7, 6, 5],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      {
        candidate: 'New York Person 2',
        data: [
          {
            ethnicity: 'Indian',
            values: [2, 4, 6, 8, 10, 8, 6, 4, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'East Asian',
            values: [1, 2, 3, 4, 5, 4, 3, 2, 1],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            ethnicity: 'Non-Asian',
            values: [3, 4, 5, 6, 7, 6, 5, 4, 3],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      {
        candidate: 'New York Person 3',
        data: [
          {
            ethnicity: 'Indian',
            values: [3, 6, 9, 12, 15, 12, 9, 6, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'East Asian',
            values: [2, 4, 6, 8, 10, 8, 6, 4, 2],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            ethnicity: 'Non-Asian',
            values: [1, 2, 3, 4, 5, 4, 3, 2, 1],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
    ];

    const arkansasData = [
      {
        candidate: 'Arkansas Person 1',
        data: [
          {
            ethnicity: 'Indian',
            values: [4, 5, 6, 7, 8, 7, 6, 5, 4],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'East Asian',
            values: [2, 3, 4, 5, 6, 5, 4, 3, 2],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            ethnicity: 'Non-Asian',
            values: [5, 6, 7, 8, 9, 8, 7, 6, 5],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      {
        candidate: 'Arkansas Person 2',
        data: [
          {
            ethnicity: 'Indian',
            values: [3, 5, 7, 9, 11, 9, 7, 5, 3],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'East Asian',
            values: [2, 4, 6, 8, 10, 8, 6, 4, 2],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            ethnicity: 'Non-Asian',
            values: [4, 5, 6, 7, 8, 7, 6, 5, 4],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      {
        candidate: 'Arkansas Person 3',
        data: [
          {
            ethnicity: 'Indian',
            values: [2, 4, 6, 8, 10, 8, 6, 4, 2],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'East Asian',
            values: [1, 3, 5, 7, 9, 7, 5, 3, 1],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            ethnicity: 'Non-Asian',
            values: [4, 5, 6, 7, 8, 7, 6, 5, 4],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
    ];

    // Set data based on selected state
    if (selectedState === 'NY') {
      setChartData(newYorkData);
    } else if (selectedState === 'AR') {
      setChartData(arkansasData);
    }
  }, [selectedState]);

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>Support Distribution for {selectedState === 'NY' ? 'New York' : 'Arkansas'} Candidates</h2>
      <p>Below is the support distribution for {selectedState === 'NY' ? 'New York Person 1, 2, 3' : 'Arkansas Person 1, 2, 3'} based on ethnicity.</p>

      {chartData.map((person) => (
        <div key={person.candidate}>
          <h3>Support for {person.candidate}</h3>
          <Line
            data={{
              labels: ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'],
              datasets: person.data.map((ethnicityData) => ({
                label: ethnicityData.ethnicity,
                data: ethnicityData.values,
                fill: true,
                backgroundColor: ethnicityData.backgroundColor,
                borderColor: ethnicityData.borderColor,
                tension: 0.4, // Smooth curves
              })),
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: true,
                  text: `Support for ${person.candidate}`,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Support Probability',
                  },
                  type: 'linear',
                },
                y: {
                  title: {
                    display: true,
                    text: 'Probability Density',
                  },
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default CandidatesContent;
