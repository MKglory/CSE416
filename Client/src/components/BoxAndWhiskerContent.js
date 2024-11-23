import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import nyIncomeData from '../data/NY_household_income_all_races_results.json'; // Import the New York income data JSON file
import arIncomeData from '../data/AR_household_income_all_races_results.json'; // Import the Arkansas income data JSON file

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function BoxAndWhiskerContent({ selectedState }) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    let incomeData;

    // Determine which state's income data to use
    if (selectedState === 'NY') {
      incomeData = nyIncomeData;
    } else if (selectedState === 'AR') {
      incomeData = arIncomeData;
    } else {
      console.error("Invalid selectedState.");
      return; // Exit if the selected state is invalid
    }

    // Prepare the data for the chart
    const labels = Object.keys(incomeData); // Extract races
    const meanIncomes = labels.map(race => incomeData[race]["Mean Household Income"]); // Extract mean household incomes
    const averageIncomes = labels.map(race => incomeData[race]["Median Household Income"]); // Extract average household incomes

    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'Mean Household Income',
          data: meanIncomes,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
        {
          label: 'Average Household Income',
          data: averageIncomes,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    });
  }, [selectedState]); // Re-run effect when selectedState changes

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
      {chartData.labels ? ( // Check if labels are available before rendering the chart
        <Bar data={chartData} options={options} height={310} />
      ) : (
        <p>Loading data...</p> // Fallback loading message
      )}
    </div>
  );
}

export default BoxAndWhiskerContent;
