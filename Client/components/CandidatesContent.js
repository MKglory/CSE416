import React, { useEffect, useState } from 'react';
// Import React and its hooks. `useState` is used to manage component state and `useEffect` is for side effects.

import { Line } from 'react-chartjs-2';
// Import the Line chart component from `react-chartjs-2` to render line charts.





import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
// Import necessary Chart.js modules like LineElement, CategoryScale, LinearScale, etc., for creating charts.

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);
// Register the imported Chart.js modules so that they can be used in the chart rendering.


/*
The data in the CandidatesContent component is dynamically set based on the selectedState prop passed to the component. Inside the useEffect hook, the algorithm checks whether the selectedState is 'NY' (New York) or 'AR' (Arkansas). Based on this condition:

If the selected state is 'NY', the newYorkData dataset is assigned to the chartData state, which contains hypothetical support data for gubernatorial candidates from New York.
If the selected state is 'AR', the arkansasData dataset is assigned to the chartData state, containing support data for candidates from Arkansas.


*/
function CandidatesContent({ selectedState }) {
  // Define the CandidatesContent component that accepts a `selectedState` prop.

  const [chartData, setChartData] = useState([]);
  // Declare a piece of state called `chartData`, initialized as an empty array, and a function to update it `setChartData`.

  useEffect(() => {
    // The `useEffect` hook is called when the component is first rendered and whenever `selectedState` changes.

    // Create a dataset for New York gubernatorial candidates with support data based on ethnicity.
    const newYorkData = [
      {
        candidate: 'Kathy Hochul (Democrat) - New York Governor Candidate',
        data: [
          {
            ethnicity: 'White',
            values: [40, 45, 50, 55, 60, 58, 55, 53, 50], // Hypothetical support percentages over time.
            backgroundColor: 'rgba(75, 192, 192, 0.5)', // Color for the background of the line chart.
            borderColor: 'rgba(75, 192, 192, 1)', // Border color for the line in the chart.
          },
          {
            ethnicity: 'Black',
            values: [80, 85, 90, 93, 95, 93, 90, 88, 85], // Hypothetical support percentages for Black voters.
            backgroundColor: 'rgba(255, 159, 64, 0.5)',
            borderColor: 'rgba(255, 159, 64, 1)',
          },
          // Add more ethnicities with their respective data and colors...
        ],
      },
      {
        candidate: 'Lee Zeldin (Republican) - New York Governor Candidate',
        data: [
          {
            ethnicity: 'White',
            values: [60, 58, 55, 53, 50, 48, 45, 43, 40], // Hypothetical data for Lee Zeldin's White voters.
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
          {
            ethnicity: 'Black',
            values: [20, 18, 15, 13, 10, 9, 8, 7, 5], // Hypothetical data for Black voters supporting Zeldin.
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
          },
          // Add more ethnicities with their respective data and colors...
        ],
      },
    ];

    // Similar dataset for Arkansas gubernatorial candidates.
    const arkansasData = [
      {
        candidate: 'Sarah Huckabee Sanders (Republican) - Arkansas Governor Candidate',
        data: [
          {
            ethnicity: 'White',
            values: [70, 72, 75, 78, 80, 79, 77, 75, 73], // Hypothetical support data for White voters in Arkansas.
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
          },
          {
            ethnicity: 'Black',
            values: [10, 12, 15, 18, 20, 19, 17, 15, 13], // Hypothetical data for Black voters in Arkansas.
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
          },
          // Add more ethnicities with their respective data and colors...
        ],
      },
      {
        candidate: 'Chris Jones (Democrat) - Arkansas Governor Candidate',
        data: [
          {
            ethnicity: 'White',
            values: [30, 28, 25, 23, 20, 19, 18, 17, 15], // Hypothetical support data for White voters supporting Chris Jones.
            backgroundColor: 'rgba(255, 206, 86, 0.5)',
            borderColor: 'rgba(255, 206, 86, 1)',
          },
          {
            ethnicity: 'Black',
            values: [90, 88, 85, 83, 80, 78, 75, 73, 70], // Hypothetical data for Black voters supporting Chris Jones.
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
          },
          // Add more ethnicities with their respective data and colors...
        ],
      },
    ];

    // Check which state is selected and set the chart data accordingly.
    if (selectedState === 'NY') {
      setChartData(newYorkData);
    } else if (selectedState === 'AR') {
      setChartData(arkansasData);
    }
  }, [selectedState]);
  // This `useEffect` hook will re-run whenever the `selectedState` prop changes.

  return (
    <div className="col-12 col-md-9 col-lg-9">
      {/* Display the title dynamically based on the selected state */}
      <h2>Support Distribution for {selectedState === 'NY' ? 'New York Governor Candidates (2022)' : 'Arkansas Governor Candidates (2022)'}</h2>
      <p>Below is the support distribution for the 2022 gubernatorial candidates in {selectedState === 'NY' ? 'New York' : 'Arkansas'} based on ethnicity.</p>

      {chartData.map((person) => (
        <div key={person.candidate}>
          <h3>Support for {person.candidate}</h3>
          <Line
            data={{
              labels: ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'], // Support probability values for the x-axis.
              datasets: person.data.map((ethnicityData) => ({
                label: ethnicityData.ethnicity, // Display the ethnicity label for each dataset.
                data: ethnicityData.values, // Support data for each ethnicity group.
                fill: true, // Fill below the line in the chart.
                backgroundColor: ethnicityData.backgroundColor, // Background color for the chart lines.
                borderColor: ethnicityData.borderColor, // Border color for the chart lines.
                tension: 0.4, // Makes the lines curved for a smooth visual effect.
              })),
            }}
            options={{
              responsive: true, // Make the chart responsive to different screen sizes.
              plugins: {
                legend: {
                  position: 'top', // Position the legend at the top of the chart.
                },
                title: {
                  display: true,
                  text: `Support for ${person.candidate}`, // Dynamic title for each candidate.
                },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Support Probability', // Label for the x-axis.
                  },
                  type: 'linear', // Define a linear scale for the x-axis.
                },
                y: {
                  title: {
                    display: true,
                    text: 'Probability Density', // Label for the y-axis.
                  },
                  beginAtZero: true, // Ensure the y-axis starts at 0.
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
// Export the `CandidatesContent` component so it can be used in other parts of the app.
