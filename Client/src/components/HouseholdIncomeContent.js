import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function HouseholdIncomeContent({ selectedState }) {
  const [chartData, setChartData] = useState(null); // Set to null initially to indicate loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8080/incomeData/${selectedState}`)
      .then((response) => {
        const incomeData = response.data;

        // Prepare the data for the chart
        const labels = Object.keys(incomeData); // Extract races
        const meanIncomes = labels.map(race => incomeData[race]["Mean Household Income"]); // Extract mean household incomes
        const averageIncomes = labels.map(race => incomeData[race]["Median Household Income"]); // Extract median household incomes

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Mean Household Income',
              data: meanIncomes,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
              label: 'Median Household Income',
              data: averageIncomes,
              backgroundColor: 'rgba(255, 99, 132, 0.6)',
            },
          ],
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching income data:', error);
        setLoading(false);
      });
  }, [selectedState]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} Household Income by Race (2022)`,
        font: {
          size: 20,
        },
      },
      tooltip: {
        enabled: true, // Keep tooltips enabled
      },
      datalabels: {
        display: false, // Ensure data labels are hidden
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Race',
          font: {
            size: 16,
          },
        },
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Household Income ($)',
          font: {
            size: 16,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      {loading ? (
        <p>Loading data...</p>
      ) : chartData ? (
        <Bar data={chartData} options={options} height={310} />
      ) : (
        <p>No data available</p> // Fallback in case of no data
      )}
    </div>
  );
}

export default HouseholdIncomeContent;