import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-charts'; // Import CanvasJS for React
import ensembleData from '../data/ensemble_data.json'; // Mock data for ensemble
import enactedPlanData from '../data/enacted_plan_data.json'; // Mock data for enacted district plans

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function StateDataSummaryContent({ selectedState }) {
  const [selectedGroup, setSelectedGroup] = useState('Black'); // Default racial/ethnic group
  const [selectedRegion, setSelectedRegion] = useState('All'); // Default region type
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    // Filter data based on selected state, group, and region
    const stateEnsembleData = ensembleData[selectedState] || {};
    const stateEnactedData = enactedPlanData[selectedState] || {};

    const filteredEnsembleData = stateEnsembleData[selectedGroup]?.[selectedRegion] || [];
    const enactedDataPoints = stateEnactedData[selectedGroup]?.[selectedRegion] || [];

    // Transform ensemble data for box-and-whisker display
    const ensemblePoints = filteredEnsembleData.map((district, index) => ({
      x: index + 1, // District index
      y: [district.min, district.lowerQuartile, district.median, district.upperQuartile, district.max],
    }));

    // Transform enacted plan data for dot display
    const enactedPoints = enactedDataPoints.map((value, index) => ({
      x: index + 1,
      y: value,
      markerType: 'circle',
      markerSize: 10,
      markerColor: 'red',
    }));

    // Chart configuration
    setChartOptions({
      animationEnabled: true,
      title: {
        text: `(Dummy Data) Box-and-Whisker Plot for ${selectedGroup} in ${selectedState}`,
        fontSize: 20,
      },
      axisX: {
        title: 'Districts',
        interval: 1,
      },
      axisY: {
        title: `${selectedGroup} Percentage`,
        minimum: 0,
        maximum: 100,
      },
      legend: {
        horizontalAlign: 'right',
        verticalAlign: 'center',
      },
      data: [
        {
          type: 'boxAndWhisker',
          name: 'Ensemble Data',
          showInLegend: true,
          dataPoints: ensemblePoints,
        },
        {
          type: 'scatter',
          name: 'Enacted Plan',
          showInLegend: true,
          dataPoints: enactedPoints,
        },
      ],
    });
  }, [selectedGroup, selectedRegion, selectedState]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>Select Group:</strong>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="Black">Black</option>
            <option value="Hispanic">Hispanic</option>
            <option value="Asian">Asian</option>
            <option value="White">White</option>
          </select>
        </label>
        <label style={{ marginLeft: '20px' }}>
          <strong>Select Region:</strong>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="All">All</option>
            <option value="Rural">Rural</option>
            <option value="Urban">Urban</option>
            <option value="Suburban">Suburban</option>
          </select>
        </label>
      </div>
      <CanvasJSChart options={chartOptions} />
    </div>
  );
}

export default StateDataSummaryContent;
