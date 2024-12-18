import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const PolarizationPlot = ({ state, group0, group1, candidate }) => {
  const [plotData, setPlotData] = useState(null);
  const [percentiles, setPercentiles] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(state, group0, group1, candidate)
        const url = `http://localhost:8080/ecological_inference/${state}/${group0}/${group1}/${candidate}/polarization`;
        const response = await axios.get(url);
        console.log(response.data)
        const dataEntry = response.data[0];
        setPlotData(dataEntry);

        // Calculate the percentiles if x_values exist
        if (dataEntry && dataEntry.xValues) {
          const lowerPercentile = percentile(dataEntry.xValues, 2.5);
          const upperPercentile = percentile(dataEntry.xValues, 97.5);
          setPercentiles({ lowerPercentile, upperPercentile });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state, group0, group1, candidate]);

  if (loading) return <div>Loading...</div>;
  if (!plotData) return <div>No data available.</div>;

  // Helper function to calculate percentile
  function percentile(arr, p) {
    const sortedArr = [...arr].sort((a, b) => a - b);
    const index = Math.floor((p / 100) * (sortedArr.length - 1));
    return sortedArr[index];
  }

  // Extract the data from the JSON entry
  const { title, xLabel, yLabel, xValues, yValues } = plotData;

  // Chart.js data configuration
  const data = {
    labels: xValues,
    datasets: [
      {
        label: 'KDE Curve',
        data: yValues,
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
          label: (context) => `${yLabel}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: xLabel,
        },
        ticks: {
          callback: function (value, index) {
            return parseFloat(xValues[index]).toFixed(3); // Round to 3 decimals
          },
        },
      },
      y: {
        title: {
          display: true,
          text: yLabel,
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
