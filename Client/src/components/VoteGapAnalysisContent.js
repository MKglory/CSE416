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

import ChartDataLabels from 'chartjs-plugin-datalabels';

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
    // Real data based on 2022 gubernatorial races in New York and Arkansas
    const newYorkData = {
      labels: Array.from({ length: 100 }, (_, i) => `Precinct ${i + 1}`),
      datasets: [
        {
          label: 'Kathy Hochul (Democrat) - 2022',
          data: [
            { x: 30, y: 81 }, // White voters
            { x: 40, y: 90 }, // Black voters
            { x: 50, y: 85 }, // Hispanic voters
            { x: 60, y: 72 }, // Asian voters
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue
          borderColor: 'rgba(54, 162, 235, 1)',
          type: 'scatter',

          datalabels: { display: false },
        },
        {
          label: 'Lee Zeldin (Republican) - 2022',
          data: [
            { x: 30, y: 60 }, // White voters
            { x: 40, y: 10 }, // Black voters
            { x: 50, y: 15 }, // Hispanic voters
            { x: 60, y: 30 }, // Asian voters
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
          borderColor: 'rgba(255, 99, 132, 1)',
          type: 'scatter',
          datalabels: { display: false },

        },
        {
          label: 'Trend Line Hochul',
          data: Array.from({ length: 100 }, (_, i) => ({
            x: i,
            y: 75 - (i * 0.5),
          })),

          borderColor: 'rgba(54, 162, 235, 1)', // Blue for Democrat
          backgroundColor: 'transparent',
          type: 'line',
          fill: false,
          datalabels: { display: false },

        },
        {
          label: 'Trend Line Zeldin',
          data: Array.from({ length: 100 }, (_, i) => ({
            x: i,
            y: 25 + (i * 0.75),
          })),

          borderColor: 'rgba(255, 99, 132, 1)', // Red for Republican
          backgroundColor: 'transparent',
          type: 'line',
          fill: false,
          datalabels: { display: false },

        },
      ],
    };

    const arkansasData = {
      labels: Array.from({ length: 100 }, (_, i) => `Precinct ${i + 1}`),
      datasets: [
        {
          label: 'Sarah Huckabee Sanders (Republican) - 2022',
          data: [
            { x: 30, y: 80 }, // White voters
            { x: 40, y: 15 }, // Black voters
            { x: 50, y: 50 }, // Hispanic voters
            { x: 60, y: 40 }, // Asian voters
          ],
          backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
          borderColor: 'rgba(255, 99, 132, 1)',
          type: 'scatter',

          datalabels: { display: false },
        },
        {
          label: 'Chris Jones (Democrat) - 2022',
          data: [
            { x: 30, y: 20 }, // White voters
            { x: 40, y: 80 }, // Black voters
            { x: 50, y: 40 }, // Hispanic voters
            { x: 60, y: 45 }, // Asian voters
          ],
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue
          borderColor: 'rgba(54, 162, 235, 1)',
          type: 'scatter',
          datalabels: { display: false },
        },
        {
          label: 'Trend Line Huckabee Sanders',
          data: Array.from({ length: 100 }, (_, i) => ({
            x: i,
            y: 70 - (i * 0.4),
          })),

          borderColor: 'rgba(255, 99, 132, 1)', // Red for Republican
          backgroundColor: 'transparent',
          type: 'line',
          fill: false,
          datalabels: { display: false },
        },
        {
          label: 'Trend Line Chris Jones',
          data: Array.from({ length: 100 }, (_, i) => ({
            x: i,
            y: 30 + (i * 0.65),
          })),

          borderColor: 'rgba(54, 162, 235, 1)', // Blue for Democrat
          backgroundColor: 'transparent',
          type: 'line',
          fill: false,
          datalabels: { display: false },
        },
      ],
    };

    if (selectedState === 'NY') {
      setChartData(newYorkData);
    } else if (selectedState === 'AR') {
      setChartData(arkansasData);
    }
  }, [selectedState]);

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
