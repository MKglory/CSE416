import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import votingData from "../data/ar_EI_White_Republican.json";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const KDEPlot = () => {
  // Helper function to compute KDE
  const computeKDE = (samples, bandwidth = 0.02, range = [0, 1], steps = 100) => {
    if (!Array.isArray(samples) || samples.length === 0) {
      return { xValues: [], yValues: [] };
    }

    const gaussianKernel = (x) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    const stepSize = (range[1] - range[0]) / steps;
    const xValues = Array.from({ length: steps }, (_, i) => range[0] + i * stepSize); // X-axis range
    const yValues = xValues.map((x) =>
      samples.reduce((sum, sample) => sum + gaussianKernel((x - sample) / bandwidth), 0) / (samples.length * bandwidth)
    );
    return { xValues, yValues };
  };

  // Safeguard against undefined data
  const targetRaceSamples = votingData?.voting_rate_target_race || [];
  const otherRaceSamples = votingData?.voting_rate_other_race || [];
  console.log(targetRaceSamples)
  // Compute KDE for both datasets
  const targetKDE = computeKDE(targetRaceSamples);
  const otherKDE = computeKDE(otherRaceSamples);

  // Chart data
  const data = {
    labels: targetKDE.xValues.map((x) => (x * 100).toFixed(1)), // Convert X-axis values to percentages
    datasets: [
      {
        label: "Target Race",
        data: targetKDE.yValues, // KDE Y values
        borderColor: "teal",
        backgroundColor: "rgba(0, 128, 128, 0.4)",
        fill: true,
      },
      {
        label: "Other Race",
        data: otherKDE.yValues, // KDE Y values
        borderColor: "orange",
        backgroundColor: "rgba(255, 165, 0, 0.4)",
        fill: true,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: "top" },
      title: { display: true, text: "Support for Hardy" },
      tooltip: { enabled: false },
      datalabels: { display: false }
    },
    scales: {
      x: {
        title: { display: true, text: "Percentage of Group Voting for Candidate" },
        ticks: { callback: (value) => `${value}%` }, // Format X-axis labels as percentages
      },
      y: {
        title: { display: true, text: "Probability Density" },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default KDEPlot;
