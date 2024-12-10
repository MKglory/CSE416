import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import kdeData from "../data/kde_data.json";

// Import Chart.js modules
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
);

const KDEPlotChartJS = ({ selectedRegion, selectedCandidate }) => {
  // Data for different groups
  const filteredData = {
    x: kdeData.x,
    Black: kdeData.Black,
    non_Black: kdeData.non_Black,
  };

  const labels = filteredData.x.map((val) => parseFloat(val.toFixed(2))); // Keep in 0-1 range

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Black",
        data: filteredData.Black,
        borderColor: "rgba(130, 202, 157, 1)", // Green for Black
        backgroundColor: "rgba(130, 202, 157, 0.4)", // Semi-transparent fill
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "non-Black",
        data: filteredData.non_Black,
        borderColor: "rgba(255, 165, 0, 1)", // Orange for non-Black
        backgroundColor: "rgba(255, 165, 0, 0.4)", // Semi-transparent fill
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: `Support for ${selectedCandidate} (${selectedRegion})`,
        font: {
          size: 18,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw.toFixed(2)}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Support for Trump",
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          maxTicksLimit: 10,
        },
        min: 0,
        max: 1, // Ensure x-axis matches Python's range
      },
      y: {
        title: {
          display: true,
          text: "Density",
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
        min: 0,
        max: 35, // Match Python y-axis range
      },
    },
  };

  return (
    <div style={{ padding: "10px" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
      </div>
      <div style={{ height: "400px", width: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default KDEPlotChartJS;
