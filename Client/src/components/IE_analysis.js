import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import kdeData from "../data/White_Biden.json"

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

const KDEPlotChartJS = ({ selectedRegion, selectedCandidate, selectedState }) => {
  const [loading, setLoading] = useState(true);
  // const [kdeData, setKdeData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch KDE data when state or candidate changes
  useEffect(() => {
    if (selectedState && selectedCandidate) {
      dataRequest();
    }
  }, [selectedState, selectedCandidate]);

  const dataRequest = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:8080/ecological_inference/${selectedState}/${selectedCandidate}`
      );
      // setKdeData(response.data);
    } catch (err) {
      console.error("Error fetching KDE data:", err);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Process data
  const filteredData = kdeData[0]
    ? {
        x: kdeData[0].x_values.map((val) => parseFloat(val.toFixed(2))),
        kde1_values: kdeData[0].kde1_values,
        kde2_values: kdeData[0].kde2_values,
        candidate: kdeData[0].candidate_name,
      }
    : { x: [], kde1_values: [], kde2_values: [], candidate: "" };

  // Chart.js data object
  const data = {
    labels: filteredData.x,
    datasets: [
      {
        label: "Black",
        data: filteredData.kde1_values,
        borderColor: "rgba(130, 202, 157, 1)", // Green
        backgroundColor: "rgba(130, 202, 157, 0.4)", // Transparent
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "non-Black",
        data: filteredData.kde2_values,
        borderColor: "rgba(255, 165, 0, 1)", // Orange
        backgroundColor: "rgba(255, 165, 0, 0.4)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
    ],
  };

  // Chart.js options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: { font: { size: 14 } },
      },
      title: {
        display: true,
        text: `Support for ${selectedCandidate} (${selectedRegion})`,
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: `Support for ${filteredData.candidate}`,
          font: { size: 14 },
        },
        ticks: { font: { size: 12 }, maxTicksLimit: 10 },
        min: 0,
        max: 1,
      },
      y: {
        title: { display: true, text: "Density", font: { size: 14 } },
        ticks: { font: { size: 12 } },
      },
    },
  };

  return (
    <div>
      <div style={{ height: "350px", width: "100%" }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default KDEPlotChartJS;
