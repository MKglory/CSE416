import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';

function Gingles({ selectedState }) {
  const [chartConfig, setChartConfig] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [colors, setColors] = useState(null);
  const [dataType, setDataType] = useState('Percent_White')
  const [regionType, setRegionType] = useState('All')
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8080/${selectedState}/Gingles/${dataType}/${regionType}`);
    setChartData(response.data.gingleData);
    setColors(response.data.colors);
    console.log(response.data)
    setLoading(false);
  };
  const dataTypeChangeHandler = (type) =>{
    setDataType(type);
  }
  const regionTypeChangeHandler = (type) =>{
    setRegionType(type);
  }
  useEffect(() =>{
    setLoading(true);
    fetchData();
  }, [dataType, selectedState, regionType])
  useEffect(() => {
    if (!chartData || loading) return
    console.log(chartData);
    const x = chartData.scatters.map((d) => parseFloat(d.xScatter));
    const yRepublican = chartData.scatters.map((d) => parseFloat(d.voteShareRepublican));
    const yDemocratic = chartData.scatters.map((d) => parseFloat(d.voteShareDemocratic));
    const xValues = chartData.trends.map((d) => d.xSmooth);
    const yRepublicanCurve = chartData.trends.map((d) => d.republicanTrend);
    const yDemocraticCurve = chartData.trends.map((d) => d.democraticTrend);
    setChartConfig({
      labels: xValues,
      datasets: [
        {
          label: "Republican Trend",
          data: yRepublicanCurve,
          borderColor: colors.republicanColor,
          fill: false,
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: "Republican Data",
          data: x.map((xi, i) => ({ x: xi, y: yRepublican[i] })),
          type: "scatter",
          backgroundColor: colors.republicanColor,
          pointRadius: 0.8,
          showLine: false,
        },
        {
          label: "Democratic Trend",
          data: yDemocraticCurve,
          borderColor: colors.democraticColor,
          fill: false,
          borderWidth: 2,
          tension: 0.5,
        },
        {
          label: "Democratic Data",
          data: x.map((xi, i) => ({ x: xi, y: yDemocratic[i] })),
          type: "scatter",
          backgroundColor: colors.democraticColor,
          pointRadius: 0.8,
          showLine: false,
        },
      ],
    });
  }, [chartData]);

  return (
    <div>
      {/* <h2>Non-Linear Regression of Vote Share vs. Demographic Percentage</h2> */}
      <div style={{ display: 'flex', width: '100%'}}>
        <ul className="list-group">
          <li className="list-group-item">
            <select className="form-select" onChange={(e) => dataTypeChangeHandler(e.target.value)}>
              <option value="Percent_White">White</option>
              <option value="Percent_Black">Black</option>
              <option value="Percent_Asian">Asian</option>
              <option value="Percent_Hispanic">Hispanic</option>
              <option value="Percent_American_Indian">American Indian</option>
              <option value="Income_Mean">Average Household Income</option>
            </select>
          </li>
        </ul>
        <ul className="list-group">
          <li className="list-group-item">
            <select className="form-select" onChange={(e) => regionTypeChangeHandler(e.target.value)}>
              <option value="All">All</option>
              <option value="Urban">Urban</option>
              <option value="Rural">Rural</option>
              <option value="Suburban">Suburban</option>
            </select>
          </li>
        </ul>
      </div>
      {chartConfig && (
        <Line
          data={chartConfig}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              // tooltip: { enabled: false },
              datalabels: { display: false },
            },
            scales: {
              x: {
                type: "linear",
                title: { display: true, text: "Percent of Demographic Group" },
                min: Math.min(...chartData.scatters.map((d) => d.xScatter)),
                max: Math.max(...chartData.scatters.map((d) => d.xScatter)),
              },
              y: {
                title: { display: true, text: "Vote Share" },
                min: 0,
                max: 100,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Gingles;
