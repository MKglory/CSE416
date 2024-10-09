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

function DistrictComparisonContent({ selectedDistrict, selectedState }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let data = [];

    // Dummy data for New York districts
    const newYorkData = [
      {
        district: 'District 1',
        data: [
          {
            demographic: 'Age (18-34)',
            values: [10, 15, 20, 25, 30, 25, 20, 15, 10],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            demographic: 'Age (35-54)',
            values: [5, 10, 15, 20, 25, 20, 15, 10, 5],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            demographic: 'Age (55+)',
            values: [2, 4, 6, 8, 10, 8, 6, 4, 2],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      // Add more districts for New York...
    ];

    // Dummy data for Arkansas districts
    const arkansasData = [
      {
        district: 'District 1',
        data: [
          {
            demographic: 'Age (18-34)',
            values: [8, 12, 18, 22, 28, 22, 18, 12, 8],
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          {
            demographic: 'Age (35-54)',
            values: [6, 12, 18, 24, 30, 24, 18, 12, 6],
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          {
            demographic: 'Age (55+)',
            values: [3, 6, 9, 12, 15, 12, 9, 6, 3],
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
        ],
      },
      // Add more districts for Arkansas...
    ];

    // Switch data based on selected state
    if (selectedState === 'NY') {
      data = newYorkData;
    } else if (selectedState === 'AR') {
      data = arkansasData;
    }

    setChartData(data);
  }, [selectedDistrict, selectedState]);

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>Demographic Comparison for {selectedDistrict}</h2>
      <p>Below is a comparison of demographics in {selectedDistrict} for {selectedState === 'NY' ? 'New York' : 'Arkansas'}.</p>

      {chartData.map((districtData) => (
        <div key={districtData.district}>
          <h3>Demographics for {districtData.district}</h3>
          <Line
            data={{
              labels: ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'],
              datasets: districtData.data.map((demographicData) => ({
                label: demographicData.demographic,
                data: demographicData.values,
                fill: true,
                backgroundColor: demographicData.backgroundColor,
                borderColor: demographicData.borderColor,
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
                  text: `Demographic Distribution in ${districtData.district}`,
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Percentage of Population',
                  },
                  type: 'linear',
                },
                y: {
                  title: {
                    display: true,
                    text: 'Demographic Group',
                  },
                },
              },
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default DistrictComparisonContent;