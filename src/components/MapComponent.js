import React, { useEffect, useState, useCallback, useMemo } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import nyDistrict from '../data/NewYork/maps/ny_district.json';
import nyCounties from '../data/NewYork/maps/ny_counties_with_population.json';
import nyCongressDistrict from '../data/NewYork/maps/ny_congress_district.json';
import arDistrict from '../data/Arkansas/maps/ar_precinct.json'
import arCounties from '../data/Arkansas/maps/ar_counties_with_votes.json';
import arCongressDistrict from '../data/Arkansas/maps/ar_congress_district.json';



const nyCenter = [42.965, -76.0167];
const arCenter = [34.7465, -92.2896];
const usBounds = [
  [24.396308, -124.848974], // Southwest
  [49.384358, -66.885444],  // Northeast
];

function MapComponent({ selectedState, setSelectedCounty, handlePlotChange }) {

  const [mapType, setMapType] = useState('counties'); // State to manage map type
  const [mapShowType, setMapShowType] = useState('Election');

  const handleSelect = (eventKey) => {
    // Update the selected map type
    if (eventKey !== 'counties'){
      setMapShowType('Election');
    }
    setMapType(eventKey);
  };

  const handleMapShowSelect = (eventKey) => {
    // Update the selected map type
    setMapShowType(eventKey);
  };

  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, 7);
    }, [center]);
    return null;
  }

  const getColorByDemographics = (demographic, population) => {
    if (demographic === 'Asian') {
      return population > 40000 ? '#006d2c' :  // Dark green
             population > 30000 ? '#31a354' :  // Medium dark green
             population > 20000 ? '#74c476' :  // Medium green
             population > 10000 ? '#a1d99b' :  // Light green
                                  '#c7e9c0';  // Very light green
    } else if (demographic === 'American') {
      return population > 5000 ? '#4a1486' :   // Dark purple
             population > 3000 ? '#6a51a3' :   // Medium dark purple
             population > 2000 ? '#807dba' :   // Medium purple
             population > 1000 ? '#9e9ac8' :   // Light purple
                                 '#dadaeb';    // Very light purple
    } else if (demographic === 'White') {
      return population > 500000 ? '#800026' : // Dark red
             population > 300000 ? '#BD0026' : // Medium dark red
             population > 200000 ? '#E31A1C' : // Medium red
             population > 100000 ? '#FC4E2A' : // Light red
                                  '#FD8D3C';   // Very light red
    } else if (demographic === 'Black') {
      return population > 50000 ? '#08306b' :  // Dark blue
             population > 30000 ? '#2171b5' :  // Medium dark blue
             population > 20000 ? '#4292c6' :  // Medium blue
             population > 10000 ? '#6baed6' :  // Light blue
                                  '#c6dbef';   // Very light blue
    } else if (demographic === 'NativeHawaiian') {
      return population > 100 ? '#7f2704' :    // Dark brown
             population > 75  ? '#a63603' :    // Medium dark brown
             population > 50  ? '#d94801' :    // Medium brown
             population > 25  ? '#f16913' :    // Light brown
                                 '#fdae6b';    // Very light brown
    } else if (demographic === 'Other') {
      return population > 10000 ? '#7f0000' :  // Dark maroon
             population > 7000  ? '#b30000' :  // Medium dark maroon
             population > 5000  ? '#d7301f' :  // Medium maroon
             population > 3000  ? '#ef6548' :  // Light maroon
                                 '#fc8d59';    // Very light maroon
    }
  };
  
  function Legend() {
    const map = useMap();
  
    useEffect(() => {
      const legend = L.control({ position: 'bottomright' });
  
      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        
        let demographic = mapShowType; // Use the current demographic being shown
        div.innerHTML = `<strong>${demographic} Population</strong><br>`;
  
        let grades, getColor;
  
        if (demographic === 'Asian') {
          grades = [10000, 20000, 30000, 40000]; // Asian population ranges
          getColor = (value) => getColorByDemographics('Asian', value);
        } else if (demographic === 'American') {
          grades = [1000, 2000, 3000, 5000]; // American Indian population ranges
          getColor = (value) => getColorByDemographics('American', value);
        } else if (demographic === 'White') {
          grades = [100000, 200000, 300000, 500000]; // White population ranges
          getColor = (value) => getColorByDemographics('White', value);
        } else if (demographic === 'Black') {
          grades = [10000, 20000, 30000, 50000]; // Black population ranges
          getColor = (value) => getColorByDemographics('Black', value);
        } else if (demographic === 'NativeHawaiian') {
          grades = [25, 50, 75, 100]; // Native Hawaiian population ranges
          getColor = (value) => getColorByDemographics('NativeHawaiian', value);
        } else if (demographic === 'Other') {
          grades = [3000, 5000, 7000, 10000]; // Other population ranges
          getColor = (value) => getColorByDemographics('Other', value);
        }
  
        for (let i = 0; i < grades.length; i++) {
          div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '; width: 18px; height: 18px; display: inline-block;"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
  
        return div;
      };
  
      legend.addTo(map);
  
      return () => {
        map.removeControl(legend);
      };
    }, [map, mapShowType]);
  
    return null;
  }
  function Legend_population() {
    const map = useMap();
  
    useEffect(() => {
      const legend = L.control({ position: 'bottomright' });
  
      legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        const grades = [20000, 50000, 100000, 150000, 300000, 500000, 800000]; // Your population ranges
        const labels = [];
  
        // Add title for legend
        div.innerHTML = '<strong>Population</strong><br>';
  
        // Loop through the population intervals and generate a label with a colored square for each interval
        for (let i = 0; i < grades.length; i++) {
          const color = getColor_population(grades[i] + 1); // Ensure the correct color for each grade
          div.innerHTML +=
            '<i style="background:' + color + '; width: 18px; height: 18px; display: inline-block;"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
      };
  
      legend.addTo(map);
  
      return () => {
        map.removeControl(legend);
      };
    }, [map]);
  
    return null;
  }

  

  const getColor_election = (result) => {
    return result === 'Republican'
      ? '#ff0000' // red
      : result === 'Democratic'
        ? '#0000ff' // blue
        : '#00ff00'; // green
  };
  const getColor_population = (population) => {
    // Define color ranges based on population size
    return population > 800000 ? '#800026' :
           population > 500000 ? '#BD0026' :
           population > 300000 ? '#E31A1C' :
           population > 150000 ? '#FC4E2A' :
           population > 100000 ? '#FD8D3C' :
           population > 50000  ? '#FEB24C' :
           population > 20000  ? '#FED976' :
                                 '#FFEDA0'; 
  };
  
  
  
  // Style function
  const style = useCallback(
    (feature) => {
      const demographicType = mapShowType; // Assuming mapShowType holds the selected demographic to show
      let population = 0;
      let fillColor = null;
      if (demographicType === 'Asian' && mapType === 'counties') {
        console.log('1')
        population = parseInt(feature.properties.Asian_population.replace(/,/g, ''), 10);
        fillColor = getColorByDemographics(demographicType, population);
      } else if (demographicType === 'American' && mapType === 'counties') {
        console.log('2')
        population = parseInt(feature.properties.American_population.replace(/,/g, ''), 10);
        fillColor = getColorByDemographics(demographicType, population);
      } else if (demographicType === 'White' && mapType === 'counties') {
        population = parseInt(feature.properties.White_population.replace(/,/g, ''), 10);
        fillColor = getColorByDemographics(demographicType, population);
      } else if (demographicType === 'Black' && mapType === 'counties') {
        population = parseInt(feature.properties.Black_population.replace(/,/g, ''), 10);
        fillColor = getColorByDemographics(demographicType, population);
      } else if (demographicType === 'NativeHawaiian' && mapType === 'counties') {
        population = parseInt(feature.properties.NativeHawaiian_population.replace(/,/g, ''), 10);
        fillColor = getColorByDemographics(demographicType, population);
      } else if (demographicType === 'Other' && mapType === 'counties') {
        population = parseInt(feature.properties.Other_population.replace(/,/g, ''), 10);
        fillColor = getColorByDemographics(demographicType, population);
      }else if (demographicType === 'Population' && mapType === 'counties'){
        population = parseInt(feature.properties.Total_population.replace(/,/g, ''), 10);
        fillColor = getColor_population(population);
      }
      else{
        const democratic_vote = feature.properties.Democratic_votes;
        const republican_vote = feature.properties.Republican_votes;
        const ELECTION_RESULT =
        democratic_vote > republican_vote ? 'Democratic' : 'Republican';
        fillColor = getColor_election(ELECTION_RESULT);
      }

      // const democratic_vote = feature.properties.Democratic_votes;
      // const republican_vote = feature.properties.Republican_votes;
      // const ELECTION_RESULT =
      // democratic_vote > republican_vote ? 'Democratic' : 'Republican';
      // fillColor = getColor_election(ELECTION_RESULT);
  
      return {
        fillColor: fillColor,
        weight: 1,
        opacity: 0.5,
        color: 'black',
        dashArray: null,
        fillOpacity: 0.7,
      };
    },
    [mapShowType] // Add demographic type as a dependency
  );
  
  

  // onEachFeature function
  const onEachFeature = useCallback(
    (feature, layer) => {
      const democratic_vote = feature.properties.Democratic_votes;
      const republican_vote = feature.properties.Republican_votes;
      const ELECTION_RESULT =
        democratic_vote > republican_vote ? 'Democratic' : 'Republican';

      let popupContent = '';

      if (mapType === 'counties') {
        layer.on({
          click: () => {
            // console.log('You clicked the county :', feature.properties.NAME)
            setSelectedCounty(feature.properties.NAME);
            handlePlotChange('countiesPopulationRace');
          }
        });
        popupContent = `
          <h5>County: ${feature.properties.NAME}</h5>
          <p>Population: ${feature.properties.Total_population}</p>
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
        `;
      }
      else if (mapType === 'district') {
        // EDID repesents the district ID
        const EDName = feature.properties.EDName;
        // console.log(EDName);
        popupContent = `
          <h5>${EDName}</h5>
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
        `;

      } else if (mapType === 'congressional district') {
        popupContent = `
          <h5>Congress District: ${feature.properties.NAME}</h5>
          <p>Population: ${feature.properties.Total_population}</p>
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
        `;
      }
      
      layer.bindPopup(popupContent);

    },
    [mapType]
  );


  // Update geoJsonComponent function
  const geoJsonComponent = useMemo(() => {
    const dataMap = {

      counties: {
        NY: nyCounties,
        AR: arCounties,
      },
      district: {
        NY: nyDistrict,
        AR: arDistrict,
      },
      'congressional district': {
        NY: nyCongressDistrict,
        AR: arCongressDistrict,
      },
    };

    const selectedData = dataMap[mapType] ? dataMap[mapType][selectedState] : undefined;


    if (!selectedData) return null;

    return (
      <GeoJSON
        //key={`${selectedState}-${mapType}`}
        key={`${selectedState}-${mapType}`}
        data={selectedData}
        style={style}
        onEachFeature={onEachFeature}
      />
    );
  }, [selectedState, mapType, style, onEachFeature]);


  const mapCenter = selectedState === 'NY' ? nyCenter : arCenter;

  return (
    <div>
      <div style={{ display: 'flex', width: '100%'}}>
        <ul className="list-group">
          <li className="list-group-item">
            <select className="form-select" onChange={(e) => handleSelect(e.target.value)} value={mapType}>
              <option value="counties">Show Counties Map</option>
              <option value="district">Show Districts Map</option>
              <option value="congressional district">Show Congress Districts Map</option>
            </select>
          </li>
        </ul>
        {mapType === 'counties'?
        <ul className="list-group">
          <li className="list-group-item">
            <select className="form-select" onChange={(e) => handleMapShowSelect(e.target.value)} value={mapShowType}>
              <option value="Election">Show Election</option>
              <option value="Population">Show Total Population</option>
              <option value="White">Show White Population</option>
              <option value="Black">Show Black Population</option>
              <option value="American">Show American Indian Population</option>
              <option value="Asian">Show Asian Population</option>
              <option value="NativeHawaiian">Show Native Hawaiia`n Population</option>
              <option value="Other">Show Other Population</option>
            </select>
          </li>
        </ul>
        : null
      }
      </div>
      <MapContainer
        center={mapCenter}
        bounds={usBounds}
        maxZoom={12}
        minZoom={5}
        scrollWheelZoom={true}
        preferCanvas={true}
      >
        <ChangeMapView center={mapCenter} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {geoJsonComponent}
        {mapShowType === 'Population' && mapType === 'counties' ?
          <Legend_population />
        :
         mapType === 'counties' && mapShowType !== 'Election' ? <Legend /> : null
        }
      </MapContainer>
    </div >
  );
}

export default MapComponent;
