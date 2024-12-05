import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Select, Checkbox, Spin } from 'antd';
import 'antd/dist/reset.css';
import ny_enactedPlan from '../data/ny_enacted_plan_percentages.json';
import ny_districtPlan from '../data/ny_district_plan_percentages.json';
import ar_enactedPlan from '../data/ar_enacted_plan_percentages.json';
import ar_districtPlan from '../data/ar_district_plan_percentages.json';
function BoxAndWhiskerContent({ selectedState }) {
  const [selectedGroup, setSelectedGroup] = useState('population_White');
  const [selectedRegions, setSelectedRegions] = useState(['rural', 'urban', 'suburban']);
  const [plotData, setPlotData] = useState([]);
  const [loading, setLoading] = useState(false);

  const racialGroups = selectedState === 'NY' ? Object.keys(ny_districtPlan) : Object.keys(ar_districtPlan);
  const districtPlan = selectedState === 'NY' ? ny_districtPlan : ar_districtPlan;
  const enactedPlan = selectedState === 'NY' ? ny_enactedPlan : ar_enactedPlan;
  const colors = {
    rural: '#2ca02c',
    urban:  '#1f77b4',
    suburban: '#ff7f0e' 
  };

  useEffect(() => {
    if (selectedGroup && selectedRegions.length > 0) {
      processData();
    }
  }, [selectedGroup, selectedRegions, selectedState]);

  const processData = () => {
    setLoading(true);
    let traces = [];

    const enactedData = [];
    selectedRegions.forEach(region => {
      const Enacted = enactedPlan[selectedGroup][region] ;
      Object.entries(Enacted).forEach(([district, percentage]) => {
        enactedData.push({
          region,
          district,
          percentage
        });
      });

    });
    enactedData.sort((a, b) => a.percentage - b.percentage);
    const districtToRegion = {};
    enactedData.forEach(item => {
      districtToRegion[item.district] = item.region;
    });

    let showLegendEnacted = true;
    const enactedPercentage = enactedData.map(item => item.percentage);
    const enactedDistrict = enactedData.map(item => item.district);
    traces.push({
      y: enactedPercentage,
      x: enactedDistrict,
      mode: 'markers',
      name: `Enacted Plan`,
      marker: { color: '#ff0000', size: 8 },
      hoverinfo: 'y+name',
      showlegend: showLegendEnacted,
    });
    showLegendEnacted = false;



    const districtData = districtPlan[selectedGroup] ;
    const showLegendDistrict = new Set();
      Object.keys(districtData).forEach(district => {
        const stats = districtData[district];
        const percentages = stats.percentages;

        if (!enactedDistrict.includes(district)) return;
        const region = districtToRegion[district];

        traces.push({
          y: percentages,
          x: Array(percentages.length).fill(district), 
         
          type: 'box',
          name: region.charAt(0).toUpperCase() + region.slice(1),
          boxpoints: false,
          marker: { color: colors[region] },
          hoverinfo: 'y+name',
          offsetgroup: district,
          alignmentgroup: district,
          showlegend: !showLegendDistrict.has(region),
  
        });
        
        showLegendDistrict.add(region);
      });
   
    setPlotData(traces);
    setLoading(false);
  };

  const handleGroupChange = value => {
    setSelectedGroup(value);
  };

  const handleRegionChange = checkedValues => {
    console.log(checkedValues);
    setSelectedRegions(checkedValues);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Box & Whisker Plot for {selectedState}</h2>
      <div style={{ marginBottom: '20px' }}>
        <Select
          style={{ width: 200, marginRight: '20px' }}
          placeholder="Select Racial/Ethnic Group"
          onChange={handleGroupChange}
          value={selectedGroup}
        >
          {racialGroups.map(group => (
            <Select.Option key={group} value={group}>
              {group.replace('population_', '')}
            </Select.Option>
          ))}
        </Select>

        <Checkbox.Group
          options={[
            { label: 'Rural', value: 'rural' },
            { label: 'Urban', value: 'urban' },
            { label: 'Suburban', value: 'suburban' },
          ]}
          defaultValue={['rural', 'urban', 'suburban']}
          onChange={handleRegionChange}
        />
      </div>

      {loading ? (
        <Spin size="large" />
      ) : (
        <Plot
          data={plotData}
          layout={{
            title: `Box & Whisker Plot for ${selectedState}`,
            xaxis: {
              title: 'Districts',
              tickangle: 0,
              automargin: true,
              type: 'category',
              showgrid: true,
              
            },
            yaxis: {
              title: 'Percentage',
              rangemode: 'tozero',
            },
            boxmode: 'group',
            autosize: true,
            showlegend: true,
          }}
          useResizeHandler
          style={{ width: '100%', height: '100%' }}
        />
      )}
    </div>
  );
}

export default BoxAndWhiskerContent;
