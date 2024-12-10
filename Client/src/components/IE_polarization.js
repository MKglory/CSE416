import React from "react";
import { Line } from "react-chartjs-2";
import polarizationKDEData from "../data/polarization_kde.json";

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

const PolarizationKDEChart = () => {
  // Extract data and confidence interval
  const labels = polarizationKDEData.x.map((val) => parseFloat(val.toFixed(2))); // X-axis
  const density = polarizationKDEData.density;
  const ciLower = polarizationKDEData.ci_lower;
  const ciUpper = polarizationKDEData.ci_upper;

  // Prepare datasets
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Polarization KDE",
        data: density,
        borderColor: "rgba(54, 162, 235, 1)", // Blue line
        backgroundColor: "rgba(54, 162, 235, 0.2)", // Blue fill
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "Confidence Interval",
        data: labels.map(
          (x) =>
            x >= ciLower && x <= ciUpper ? density[labels.indexOf(x)] : null // Shade CI region
        ),
        borderColor: "rgba(0, 0, 0, 0)", // No line
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Gray fill for CI
        fill: true,
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
        text: `Polarization KDE for Trump: Prob(difference in [${ciLower.toFixed(
          2
        )}, ${ciUpper.toFixed(2)}]) = 95.0%`,
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "(Black - non-Black) support for Trump",
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
      },
    },
  };

  return (
    <div style={{ padding: "10px" }}>
      <h2 style={{ fontSize: "24px", textAlign: "center" }}>Polarization KDE</h2>
      <div style={{ height: "400px", width: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default PolarizationKDEChart;
