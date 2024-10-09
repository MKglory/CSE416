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
    // Real data for 2022 New York and Arkansas gubernatorial elections
    const newYorkData = [
      {
        candidate: 'Kathy Hochul (Democrat) - New York Governor Candidate',
        data: [
          {
            ethnicity: 'White',
            values: [40, 45, 50, 55, 60, 58, 55, 53, 50], // Hypothetical support data based on trends
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'Black',
            values: [80, 85, 90, 93, 95, 93, 90, 88, 85],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            ethnicity: 'Hispanic',
            values: [70, 75, 78, 80, 82, 81, 79, 77, 75],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
          {
            ethnicity: 'Asian',
            values: [60, 63, 66, 69, 72, 71, 70, 68, 65],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
          },
        ],
      },
      {
        candidate: 'Lee Zeldin (Republican) - New York Governor Candidate',
        data: [
          {
            ethnicity: 'White',
            values: [60, 58, 55, 53, 50, 48, 45, 43, 40],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
          {
            ethnicity: 'Black',
            values: [20, 18, 15, 13, 10, 9, 8, 7, 5],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
          },
          {
            ethnicity: 'Hispanic',
            values: [30, 28, 25, 23, 20, 19, 18, 17, 15],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'Asian',
            values: [40, 38, 36, 34, 32, 31, 30, 29, 28],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
        ],
      },
    ];

    const arkansasData = [
      {
        candidate: 'Sarah Huckabee Sanders (Republican) - Arkansas Governor Candidate',
        data: [
          {
            ethnicity: 'White',
            values: [70, 72, 75, 78, 80, 79, 77, 75, 73],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
          {
            ethnicity: 'Black',
            values: [10, 12, 15, 18, 20, 19, 17, 15, 13],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
          {
            ethnicity: 'Hispanic',
            values: [50, 52, 55, 58, 60, 58, 55, 53, 50],
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
            borderColor: 'rgba(153, 102, 255, 1)',
          },
        ],
      },
      {
        candidate: 'Chris Jones (Democrat) - Arkansas Governor Candidate',
        data: [
          {
            ethnicity: 'White',
            values: [30, 28, 25, 23, 20, 19, 18, 17, 15],
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
          },
          {
            ethnicity: 'Black',
            values: [90, 88, 85, 83, 80, 78, 75, 73, 70],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            ethnicity: 'Hispanic',
            values: [50, 48, 45, 43, 40, 39, 38, 37, 35],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
      <h2>Support Distribution for {selectedState === 'NY' ? 'New York Governor Candidates (2022)' : 'Arkansas Governor Candidates (2022)'}</h2>
      <p>Below is the support distribution for the 2022 gubernatorial candidates in {selectedState === 'NY' ? 'New York' : 'Arkansas'} based on ethnicity.</p>

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