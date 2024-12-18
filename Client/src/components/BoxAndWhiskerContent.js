import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Select, Checkbox, Spin } from 'antd';
import axios from "axios";
import 'antd/dist/reset.css';
import ny_enactedPlan from '../data/ny_enacted_plan_percentages.json';
import ny_districtPlan from '../data/ny_district_plan_percentages.json';
import ar_enactedPlan from '../data/ar_enacted_plan_percentages.json';
import ar_districtPlan from '../data/ar_district_plan_percentages.json';
function BoxAndWhiskerContent({ selectedState }) {
  const [selectedGroup, setSelectedGroup] = useState('populationWhite');
  const [selectedRegions, setSelectedRegions] = useState(['rural', 'urban', 'suburban']);
  const [chartData, setChartData] = useState(null);
  const [plotData, setPlotData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchData();
  },[selectedState])

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:8080/${selectedState}/BoxWhisker`);
    setChartData(response.data);
    console.log(response.data);
    setLoading(false);
  }

  const filterData = (data) => {
    if (!data) return null;

    const toFilteredDictionary = (object) =>
      Object.entries(object)
        .filter(([key]) => key !== 'id' && key !== 'state')
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

    return {
      racialGroups: Object.keys(data.partitions).filter(
        key => key !== 'id' && key !== 'state'
      ),
      districtPlan: toFilteredDictionary(data.partitions),
      enactedPlan: toFilteredDictionary(data.enacted),
    };
  };
  
  const processedData = chartData ? filterData(chartData) : null;
  const { racialGroups, districtPlan, enactedPlan } = processedData || {};

  useEffect(() => {
    if (!loading && chartData && selectedGroup && selectedRegions.length > 0) {
      console.log(enactedPlan);
      processData();
    }
  }, [selectedGroup, selectedRegions, selectedState, chartData]);

  const processData = () => {
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

    const colors = {
      rural: chartData.colors.rural,
      urban:  chartData.colors.urban,
      suburban: chartData.colors.suburban 
    };

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
  };

  const handleGroupChange = value => {
    setSelectedGroup(value);
  };

  const handleRegionChange = checkedValues => {
    console.log(checkedValues);
    setSelectedRegions(checkedValues);
  };
  if (!chartData || loading) return <div> Loading... </div>

  return (
    <div>
      {/* <h2>Box & Whisker Plot for {selectedState}</h2> */}
      <div>
        <Select
          style={{ width: 200, marginRight: '20px' }}
          placeholder="Select Racial/Ethnic Group"
          onChange={handleGroupChange}
          value={selectedGroup}
        >
          {racialGroups.map(group => (
            <Select.Option key={group} value={group}>
              {group === 'populationIndian' 
                ? 'American Indian' 
                : group === 'averageIncome' 
                ? 'Average Income' 
                : group.replace('population', '').replace('_', ' ')
            }            </Select.Option>
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
