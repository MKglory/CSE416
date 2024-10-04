import React, { useEffect, useState, useCallback, useMemo } from 'react';
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

function MapComponent({ selectedState }) {

  const [mapType, setMapType] = useState('counties'); // State to manage map type

  const handleSelect = (eventKey) => {
    // Update the selected map type
    setMapType(eventKey);
  };

  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, 7);
    }, [center]);
    return null;
  }

  const getColor = (result) => {
    return result === 'Republican'
      ? '#ff0000' // red
      : result === 'Democratic'

        ? '#0000ff' // blue
        : '#00ff00'; // green
  };

  // Style function
  const style = useCallback(
    (feature) => {
      const democratic_vote = feature.properties.Democratic_votes;
      const republican_vote = feature.properties.Republican_votes;
      const ELECTION_RESULT =
        democratic_vote > republican_vote ? 'Democratic' : 'Republican';


      // Return the style object
      return {
        fillColor: getColor(ELECTION_RESULT),
        weight: 1,
        opacity: 0.5,
        color: 'black',
        dashArray: null,
        fillOpacity: 0.7,
      };
    },
    [getColor]
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
      <ul className="list-group">
        <li className="list-group-item">
          <select className="form-select" onChange={(e) => handleSelect(e.target.value)} value={mapType}>
            <option value="counties">Show Counties Map</option>
            <option value="district">Show Districts Map</option>
            <option value="congressional district">Show Congress Districts Map</option>
          </select>
        </li>
      </ul>
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
      </MapContainer>
    </div >
  );
}

export default MapComponent;
