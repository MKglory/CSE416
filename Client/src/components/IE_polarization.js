import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import jsonData from '../data/ny_polarization_Asian_American_Indian_Trump.json';  // Assuming the JSON file is in the same directory

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PolarizationPlot = () => {
  const [plotData, setPlotData] = useState(null);
  const [percentiles, setPercentiles] = useState(null);

  useEffect(() => {
    // Set the plot data once the component mounts
    const dataEntry = jsonData[0];
    if (dataEntry) {
      setPlotData(dataEntry);

      // Calculate the 2nd and 98th percentiles
      if (dataEntry.x_values) {
        const lowerPercentile = percentile(dataEntry.x_values, 2.5);
        const upperPercentile = percentile(dataEntry.x_values, 97.5);
        setPercentiles({ lowerPercentile, upperPercentile });
      }
    }
  }, []);

  if (!plotData) {
    return <div>Loading...</div>;
  }

  if (!percentiles) {
    return <div>Calculating percentiles...</div>;
  }

  // Helper function to calculate percentile
  function percentile(arr, p) {
    const sortedArr = [...arr].sort((a, b) => a - b);
    const index = Math.floor((p / 100) * (sortedArr.length - 1));
    return sortedArr[index];
  }

  // Extract the data from the JSON entry
  const { title, x_label, y_label, x_values, y_values } = plotData;

  // Chart.js data configuration
  const data = {
    labels: x_values,
    datasets: [
      {
        label: 'KDE Curve',
        data: y_values,
        fill: true,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4, // Add tension for smoother lines
        borderWidth: 2,
      },
    ],
  };

  // Chart.js options configuration
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${y_label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: x_label,
        },
        ticks: {
          // Display x_values as they are without modification
          callback: function (value, index) {
            return parseFloat(x_values[index]).toFixed(3); // Round to 1 decimal
          },
        },
      },
      y: {
        title: {
          display: true,
          text: y_label,
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
      <div>
        <p>
          prob( difference in [{percentiles.lowerPercentile.toFixed(2)}, {percentiles.upperPercentile.toFixed(2)}] ) = 95%
        </p>
      </div>
    </div>
  );
};

export default PolarizationPlot;