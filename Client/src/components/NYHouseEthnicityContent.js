import React from 'react';  // Import React library to create components
import { Bar } from 'react-chartjs-2';  // Import Bar chart component from react-chartjs-2 library
import {
  Chart as ChartJS,       // Import the main Chart.js module for creating and configuring charts
  BarElement,             // Import BarElement to define the chart as a bar chart
  CategoryScale,          // Import CategoryScale to support categorical data on the x-axis
  LinearScale,            // Import LinearScale to create a linear scale for the y-axis
  Tooltip,                // Import Tooltip to display additional info when hovering over chart elements
  Legend,                 // Import Legend to show the chart's legend
} from 'chart.js';         // Import Chart.js components

// Register necessary Chart.js components to ensure they are available to use
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


//The NY or AR data is chosen at <Bar data={stateData[selectedState]} options={options} height={310}/>

function NYHouseEthnicityContent({ selectedState }) {  // Functional component that accepts selectedState as a prop
  const year = 2024; // Set the year to reflect current year (or data being used)

  // Define the data for both New York (NY) and Arkansas (AR) House of Representatives
  const stateData = {
    NY: {
      labels: ['White', 'Black or African American', 'Hispanic or Latino', 'Asian', 'Other'],  // x-axis labels for New York
      datasets: [
        {
          label: 'Number of Representatives',  // Data label for the chart
          data: [16, 5, 3, 2, 0],  // Number of representatives for each race/ethnicity group in New York
          backgroundColor: 'rgba(54, 162, 235, 0.6)',  // Blue color for New York bars
        },
      ],
    },
    AR: {
      labels: ['White', 'Black or African American', 'Hispanic or Latino', 'Asian', 'Other'],  // x-axis labels for Arkansas
      datasets: [
        {
          label: 'Number of Representatives',  // Data label for Arkansas chart
          data: [3, 1, 0, 0, 0],  // Number of representatives for each race/ethnicity group in Arkansas
          backgroundColor: 'rgba(255, 99, 132, 0.6)',  // Red color for Arkansas bars
        },
      ],
    },
  };

  // Define chart options such as responsiveness, legend position, and axis titles
  const options = {
    responsive: true,  // Make the chart responsive to different screen sizes
    plugins: {
      legend: {
        position: 'top',  // Position the legend at the top of the chart
      },
      title: {
        display: true,  // Display the chart title
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} House of Representatives Race and Ethnicity Distribution (${year})`,  // Dynamic title based on the selected state
      },
    },
    scales: {
      x: {
        title: {
          display: true,  // Display title for x-axis
          text: 'Race and Ethnicity',  // Set title for x-axis
        },
        type: 'category',  // Define the x-axis as a categorical axis
      },
      y: {
        title: {
          display: true,  // Display title for y-axis
          text: 'Number of Representatives',  // Set title for y-axis
        },
        beginAtZero: true,  // Ensure the y-axis starts at zero
      },
    },
  };

  // Return the JSX to render the Bar chart with appropriate data and options
  return (
    <div className="col-12 col-md-9 col-lg-9">  {/* Set the chart container size */}
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} House of Representatives Race and Ethnicity Data</h2>  {/* Dynamic heading based on selectedState */}

      <Bar data={stateData[selectedState]} options={options} height={310}/>  {/* Render the Bar chart, passing in state-specific data and options */}
    </div>
  );
}

export default NYHouseEthnicityContent;  // Export the component for use in other parts of the app
