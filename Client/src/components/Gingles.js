import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import regression from 'regression';
import axios from 'axios';

// Load static JSON data file in React for fallback
import ardata from '../data/ar_election_data.json';
import nydata from '../data/ny_election_data.json';

function Gingles({ selectedState }) {
  const [chartData, setChartData] = useState(null);
  const [data, setData] = useState(null);
  const [race, setRace] = useState('whitePopulation');
  const [dataType, setDataType] = useState('Race');
  const [loading, setLoading] = useState(false);

  const dataFetch = async () => {
    try {
      console.log(dataType);
      const response = await axios.get(`http://localhost:8080/${selectedState}/Gingles/${dataType}`);
      setData(response.data);
      console.log(response.data);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    dataFetch();
  }, [selectedState, dataType]);

  useEffect(() => {
    if (!data || loading) return; // Ensure data is available and loading is false

    // Filter and clean the data
    const cleanedData = data.filter(d => d.voteShareDemocracy && d.voteShareRepublican && (d[race] || d.Income_Mean));
    console.log(cleanedData)
    const get_x_data = () => {
      if (dataType === 'Race') {
        return cleanedData.map(d => parseFloat(d[race] / d.totalPopulation)).filter(x => x <= 1);
      } else if (dataType === 'Income') {
        const maxIncome = Math.max(...cleanedData.map(d => d.Income_Mean));
        console.log(maxIncome)
        return cleanedData.map(d => parseFloat(d.Income_Mean / maxIncome)).filter(x => x <= 1);
      }
    };

    const x = get_x_data();
    const y_Republican = cleanedData.map(d => parseFloat(d.voteShareDemocracy));
    const y_Democratic = cleanedData.map(d => parseFloat(d.voteShareRepublican));

    const regressionRepublican = regression.polynomial(x.map((xi, i) => [xi, y_Republican[i]]), { order: 2 });
    const regressionDemocratic = regression.polynomial(x.map((xi, i) => [xi, y_Democratic[i]]), { order: 2 });

    const xValues = Array.from(new Array(100), (_, i) => Math.min(...x) + (i * (Math.max(...x) - Math.min(...x)) / 100));
    const y_Republican_Curve = xValues.map(xi => regressionRepublican.predict(xi)[1]);
    const y_Democratic_Curve = xValues.map(xi => regressionDemocratic.predict(xi)[1]);

    setChartData({
      labels: xValues,
      datasets: [
        {
          label: 'Republican Trend',
          data: y_Republican_Curve,
          borderColor: 'Red',
          fill: false,
          borderWidth: 2,
          order: 1
        },
        {
          label: 'Republican Data',
          data: x.map((xi, i) => ({ x: xi, y: y_Republican[i] })),
          backgroundColor: 'rgba(139, 0, 0, 0.01)',
          borderColor: 'rgba(139, 0, 0, 0.05)',
          type: 'scatter',
          showLine: false,
          pointStyle: 'circle',
          pointRadius: 2,
          order: 0
        },
        {
          label: 'Democratic Trend',
          data: y_Democratic_Curve,
          borderColor: 'Blue',
          fill: false,
          borderWidth: 2,
          order: 1
        },
        {
          label: 'Democratic Data',
          data: x.map((xi, i) => ({ x: xi, y: y_Democratic[i] })),
          backgroundColor: 'rgba(0, 0, 139, 0.01)',
          borderColor: 'rgba(0, 0, 139, 0.05)',
          type: 'scatter',
          showLine: false,
          pointStyle: 'circle',
          pointRadius: 2,
          order: 0
        }
      ]
    });
  }, [data, race, selectedState, loading]);

  const toggleDataType = () => {
    setDataType(prevType => (prevType === 'Race' ? 'Income' : 'Race'));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Non-Linear Regression of Vote Share vs. Demographic Percentage</h2>
      <button onClick={toggleDataType}>
        Switch to {dataType === 'Race' ? 'Income' : 'Race'}
      </button>
      {chartData && (
        <Line
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              tooltip: { enabled: false },
              datalabels: { display: false }
            },
            scales: {
              x: {
                type: 'linear',
                title: { display: true, text: 'Percent of Demographic Group' },
                ticks: { display: true, callback: value => `${(value * 100).toFixed(0)}%` },
                min: 0,
                max: 1
              },
              y: {
                title: { display: true, text: 'Vote Share' }
              }
            }
          }}
        />
      )}
    </div>
  );
}

export default Gingles;
