import React, { useEffect, useState } from 'react'; 
// Import necessary React hooks for managing component state and lifecycle effects.

import { Scatter } from 'react-chartjs-2'; 
// Import the Scatter chart type from the 'react-chartjs-2' library, a wrapper around Chart.js.

import { 
  Chart as ChartJS, ScatterController, LineController, LineElement, 
  PointElement, LinearScale, CategoryScale, Tooltip, Legend, Title 
} from 'chart.js'; 
// Import necessary Chart.js components such as controllers, elements, and scales.

import ChartDataLabels from 'chartjs-plugin-datalabels'; 
// Import a Chart.js plugin that allows displaying labels on data points.

ChartJS.register( 
  ScatterController, LineController, LineElement, PointElement, LinearScale, 
  CategoryScale, Tooltip, Legend, Title, ChartDataLabels 
); 
// Register the Chart.js components and the data labels plugin to be used in the chart.

function VoteGapAnalysisContent({ selectedState }) { 
  // Define a functional component that accepts the selectedState as a prop.

  const [chartData, setChartData] = useState({ labels: [], datasets: [] }); 
  // Declare a state variable 'chartData' with an empty structure for labels and datasets.

  useEffect(() => { 
    // Define a side effect hook that runs when the selectedState changes.

    const newYorkData = { 
      // Define data for the New York gubernatorial election (2022).
      labels: Array.from({ length: 100 }, (_, i) => `Precinct ${i + 1}`), 
      // Create an array of labels for 100 precincts.

      datasets: [
        { 
          label: 'Kathy Hochul (Democrat) - 2022', 
          // Label for Kathy Hochul's dataset.
          data: [
            { x: 30, y: 81 }, { x: 40, y: 90 }, { x: 50, y: 85 }, { x: 60, y: 72 }
          ], 
          // Data points for different voter demographics by race.
          backgroundColor: 'rgba(54, 162, 235, 0.6)', 
          // Background color for Hochul's data points (blue).
          borderColor: 'rgba(54, 162, 235, 1)', 
          // Border color for Hochul's data points.
          type: 'scatter', 
          // Specify the chart type as scatter plot.
          datalabels: { display: false }, 
          // Disable data labels for this dataset.
        },
        { 
          label: 'Lee Zeldin (Republican) - 2022', 
          // Label for Lee Zeldin's dataset.
          data: [
            { x: 30, y: 60 }, { x: 40, y: 10 }, { x: 50, y: 15 }, { x: 60, y: 30 }
          ], 
          // Data points for Zeldin's voters.
          backgroundColor: 'rgba(255, 99, 132, 0.6)', 
          // Background color for Zeldin's data points (red).
          borderColor: 'rgba(255, 99, 132, 1)', 
          type: 'scatter', 
          datalabels: { display: false }, 
        },
        { 
          label: 'Trend Line Hochul', 
          // Label for Kathy Hochul's trend line dataset.
          data: Array.from({ length: 100 }, (_, i) => ({ x: i, y: 75 - (i * 0.5) })), 
          // Generate 100 data points for the trend line showing a downward trend.
          borderColor: 'rgba(54, 162, 235, 1)', 
          // Border color for the trend line (blue).
          backgroundColor: 'transparent', 
          // Make the background transparent since it's a line chart.
          type: 'line', 
          // Specify chart type as a line.
          fill: false, 
          datalabels: { display: false }, 
        },
        { 
          label: 'Trend Line Zeldin', 
          // Label for Lee Zeldin's trend line dataset.
          data: Array.from({ length: 100 }, (_, i) => ({ x: i, y: 25 + (i * 0.75) })), 
          // Generate 100 data points for Zeldin's trend line showing an upward trend.
          borderColor: 'rgba(255, 99, 132, 1)', 
          backgroundColor: 'transparent', 
          type: 'line', 
          fill: false, 
          datalabels: { display: false }, 
        },
      ],
    };

    const arkansasData = { 
      // Define data for the Arkansas gubernatorial election (2022).
      labels: Array.from({ length: 100 }, (_, i) => `Precinct ${i + 1}`), 
      datasets: [
        { 
          label: 'Sarah Huckabee Sanders (Republican) - 2022', 
          // Label for Huckabee Sanders' dataset.
          data: [
            { x: 30, y: 80 }, { x: 40, y: 15 }, { x: 50, y: 50 }, { x: 60, y: 40 }
          ], 
          backgroundColor: 'rgba(255, 99, 132, 0.6)', 
          borderColor: 'rgba(255, 99, 132, 1)', 
          type: 'scatter', 
          datalabels: { display: false }, 
        },
        { 
          label: 'Chris Jones (Democrat) - 2022', 
          // Label for Chris Jones' dataset.
          data: [
            { x: 30, y: 20 }, { x: 40, y: 80 }, { x: 50, y: 40 }, { x: 60, y: 45 }
          ], 
          backgroundColor: 'rgba(54, 162, 235, 0.6)', 
          borderColor: 'rgba(54, 162, 235, 1)', 
          type: 'scatter', 
          datalabels: { display: false }, 
        },
        { 
          label: 'Trend Line Huckabee Sanders', 
          data: Array.from({ length: 100 }, (_, i) => ({ x: i, y: 70 - (i * 0.4) })), 
          borderColor: 'rgba(255, 99, 132, 1)', 
          backgroundColor: 'transparent', 
          type: 'line', 
          fill: false, 
          datalabels: { display: false }, 
        },
        { 
          label: 'Trend Line Chris Jones', 
          data: Array.from({ length: 100 }, (_, i) => ({ x: i, y: 30 + (i * 0.65) })), 
          borderColor: 'rgba(54, 162, 235, 1)', 
          backgroundColor: 'transparent', 
          type: 'line', 
          fill: false, 
          datalabels: { display: false }, 
        },
      ],
    };

    // Update the chart data based on the selectedState (NY or AR).
    if (selectedState === 'NY') {
      setChartData(newYorkData); 
    } else if (selectedState === 'AR') {
      setChartData(arkansasData); 
    }
  }, [selectedState]); 
  // Trigger the effect whenever selectedState changes.

  return (
    <div className="container-fluid full-page">
      <div className="row full-height">
        <div className="col-md-12 full-height">
          <div className="content fade-in" style={{ height: 'calc(100vh - 100px)' }}>
            <h2>Vote Gap Analysis for {selectedState === 'NY' ? 'New York' : 'Arkansas'} Candidates (2022)</h2>
            <p>
              Below is the vote distribution for {selectedState === 'NY' ? 'Kathy Hochul and Lee Zeldin' : 'Sarah Huckabee Sanders and Chris Jones'} based on major racial groups in the 2022 gubernatorial election.
            </p>
            <Scatter
              data={chartData} 
              height={null}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: `Vote Gap Analysis by Race for ${selectedState === 'NY' ? 'New York' : 'Arkansas'} (2022)`,
                  },
                  datalabels: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Percent of Racial Group',
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
        </div>
      </div>
    </div>
  );
}

export default VoteGapAnalysisContent; 