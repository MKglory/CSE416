import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from 'axios';

function Gingles({ selectedState, selectedId, setSelectedId }) {
  const [chartConfig, setChartConfig] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [colors, setColors] = useState(null);
  const [dataType, setDataType] = useState('Null')
  const [regionType, setRegionType] = useState('All')
  const [loading, setLoading] = useState(true);
  const [gingleAnalysisTarget, setGingleAnalysisTarget] = useState('None')
  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8080/${selectedState}/Gingles/${dataType}/${regionType}`);
    setChartData(response.data.gingleData);
    setColors(response.data.colors);
    console.log(response.data)
    setLoading(false);
  };
  const gingleAnalysisTargetChangeHandler = (type) =>{
    setGingleAnalysisTarget(type);
  }
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
    const republicanScatterData = x.map((xi, i) => ({
      x: xi,
      y: yRepublican[i],
      precinctID: chartData.scatters[i].precinctID, // Include PrecinctID
    }));
    
    const democraticScatterData = x.map((xi, i) => ({
      x: xi,
      y: yDemocratic[i],
      precinctID: chartData.scatters[i].precinctID, // Include PrecinctID
    }));
    
    setChartConfig({
      labels: xValues,
      datasets: [
        {
          label: "Republican Trend",
          data: yRepublicanCurve,
          borderColor: colors.republicanColorTrend,
          fill: false,
          borderWidth: 1,
          tension: 0.5,
        },
        {
          label: "Republican Data",
          data: republicanScatterData,
          type: "scatter",
          backgroundColor: colors.republicanColorScatter,
          pointRadius: 0.8,
          showLine: false,
        },
        {
          label: "Democratic Trend",
          data: yDemocraticCurve,
          borderColor: colors.democraticColorTrend,
          fill: false,
          borderWidth: 2,
          tension: 0.5,
        },
        {
          label: "Democratic Data",
          data: democraticScatterData,
          type: "scatter",
          backgroundColor: colors.democraticColorScatter,
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
          <li className="list-group-item" onChange={(e) => gingleAnalysisTargetChangeHandler(e.target.value)}>
            <select className="form-select">
              <option value="Null">None</option>
              <option value="race">Race</option>
              <option value="income">Income</option>
              <option value="income/race">Combination race and income</option>
            </select>
          </li>
        </ul>
        {gingleAnalysisTarget === 'race'?
          <ul className="list-group">
            <li className="list-group-item">
              <select className="form-select" value={dataType} onChange={(e) => dataTypeChangeHandler(e.target.value)}>
                <option value="Null">None</option>
                <option value="Percent_White">White</option>
                <option value="Percent_Black">Black</option>
                <option value="Percent_Asian">Asian</option>
                <option value="Percent_Hispanic">Hispanic</option>
                <option value="Percent_American_Indian">American Indian</option>
                {/* <option value="Income_Mean">Average Household Income</option> */}
              </select>
            </li>
          </ul>
          : null
        }
        {gingleAnalysisTarget === 'income'?
          <ul className="list-group">
            <li className="list-group-item">
              <select className="form-select" value={dataType}  onChange={(e) => dataTypeChangeHandler(e.target.value)}>
                <option value="Null">None</option>
                <option value="Income_Mean">Average Household Income</option>
              </select>
            </li>
          </ul>
          : null
        }
        {gingleAnalysisTarget === 'income/race'?
          <ul className="list-group">
            <li className="list-group-item">
              <select className="form-select" value={dataType}  onChange={(e) => dataTypeChangeHandler(e.target.value)}>
                <option value="Null">None</option>
                <option value="Race_Income_Combination_Percent_White">White</option>
                <option value="Race_Income_Combination_Percent_Black">Black</option>
                <option value="Race_Income_Combination_Percent_Asian">Asian</option>
                <option value="Race_Income_Combination_Percent_Hispanic">Hispanic</option>
                <option value="Race_Income_Combination_Percent_American_Indian">American Indian</option>             
              </select>
            </li>
          </ul>
          : null
        }
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
              // legend: { position: "top" },
              // datalabels: { display: false },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    const pointData = context.raw; // Access the data for the hovered point
                    if (pointData.precinctID) {
                      return `Precinct: ${pointData.precinctID},`;
                    }
                    return `${context.dataset.label}`;
                  },
                },
              },
              datalabels: { display: false },

            },
            scales: {
              x: {
                type: "linear",
                title: { display: true, text: "Selected Data Group" },
                min: Math.min(...chartData.scatters.map((d) => d.xScatter)),
                max: Math.max(...chartData.scatters.map((d) => d.xScatter)),
              },
              y: {
                title: { display: true, text: "Vote Share" },
                min: 0,
                max: 100,
              },
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const elementIndex = elements[0].index; // Index of the clicked element
                const datasetIndex = elements[0].datasetIndex; // Dataset index
                const clickedDataset = chartConfig.datasets[datasetIndex];
                const clickedPoint = clickedDataset.data[elementIndex];
                console.log("clicked ", clickedPoint)

                if (clickedPoint.precinctID) {
                  setSelectedId(clickedPoint.precinctID); // Update the state with the clicked PrecinctID
                }
              }
            },
          }}
        />
      )}
    </div>
  );
}

export default Gingles;
