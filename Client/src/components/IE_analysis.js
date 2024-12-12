import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";

import kdeData from "../data/Urban_Trump.json";

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
  const [kdeData, setKdeData] = useState(null);

  useEffect(() => {
    setLoading(true);
    dataRequest();
  }, [selectedState, kdeData]);
  
  const dataRequest = async () => {
    const response = await axios.get(`http://localhost:8080/ecological_inference/${selectedState}/${selectedCandidate}`);
    setKdeData(response.data);
    console.log(response.data)
    setLoading(false);
  };

  const filteredData = {
    x: kdeData[0].x_values.map((val) => parseFloat(val.toFixed(2))),
    kde1_values: kdeData[0].kde1_values,
    kde2_values: kdeData[0].kde2_values,
    candidate: kdeData[0].candidate_name
  };
  console.log(filteredData)
  // const labels = filteredData.x.map((val) => parseFloat(val.toFixed(2))); // Keep in 0-1 range

  const data = {
    labels: filteredData.x,
    datasets: [
      {
        label: "Black",
        data: filteredData.kde1_values,
        borderColor: "rgba(130, 202, 157, 1)", // Green for Black
        backgroundColor: "rgba(130, 202, 157, 0.4)", // Semi-transparent fill
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      },
      {
        label: "non-Black",
        data: filteredData.kde2_values,
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
          text: `Support for ${filteredData.candidate}`,
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          // callback: function (value, index, values) {
          //   // Format x-axis labels to 2 decimal places
          //   return parseFloat(value).toFixed(2);
          // },
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
      },
    },
  };
  if (loading || !kdeData) return <div>Data is loading</div>
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
