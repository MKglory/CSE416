import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import nyDistrict from '../data/NewYork/maps/ny_district.json';
import nyCounties from '../data/NewYork/maps/ny_counties_with_population.json';
import ny_races from '../data/NewYork/ny_race_population.json'
// import nyCongressDistrict from '../data/NewYork/maps/ny_congress_district.json';
import arDistrict from '../data/Arkansas/maps/ar_precinct.json'
import arCounties from '../data/Arkansas/maps/ar_counties_with_population.json';
import ar_races from '../data/Arkansas/ar_race_population.json'
import arCongressDistrict from '../data/Arkansas/maps/ar_congress_district_without_hawawi.json';



const nyCenter = [42.965, -76.0167];
const arCenter = [34.7465, -92.2896];
const usBounds = [
  [24.396308, -124.848974], // Southwest
  [49.384358, -66.885444],  // Northeast
];

function MapComponent({ selectedState, setSelectedCounty, handlePlotChange }) {
  const [mapShowType, setMapShowType] = useState('Election');
  const [CongressDistrict, setCongressDistrict] = useState(null);
  let [loading, setLoading] = useState(true); 

  
  const handleMapShowSelect = (eventKey) => {
    setMapShowType(eventKey);
  };

  const mapDataRequest = async () => {
    const response = await axios.get(`http://localhost:8080/map/${selectedState.toLowerCase()}District`);
    setCongressDistrict(response.data);
    setLoading(false); 
  };
  
  useEffect(() => {
    setLoading(true);
    mapDataRequest();
  },[selectedState]);

  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, 7);
    }, [center]);
    return null;
  }
  const getColor_election = (result) => {
    return result === 'Republican'
      ? '#ff0000' // red
      : result === 'Democratic'
        ? '#0000ff' // blue
        : '#00ff00'; // green
  };
  
  
  // Style function
  const style = useCallback(
    (feature) => {
      let fillColor = null;

      const democratic_vote = feature.properties.Democratic_votes;
      const republican_vote = feature.properties.Republican_votes;
      const ELECTION_RESULT =
      democratic_vote > republican_vote ? 'Democratic' : 'Republican';
      fillColor = getColor_election(ELECTION_RESULT);
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
      const DistrictNum = feature.properties.NAME.match(/\d+/);
      const districtKey = `District ${DistrictNum}`;
      const districtData = selectedState == 'AR' ? ar_races[districtKey] : ny_races[districtKey];
      let popupContent = '';
      if (districtData) {
        popupContent = `
          <h5>Congress District: ${feature.properties.NAME}</h5>
          <p>Population: ${districtData["Total population"]}</p>
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
        `;
      } else {
        popupContent = `
          <h5>Congress District: ${feature.properties.NAME}</h5>
          <p>Population data not available.</p>
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
        `;
      }

      
      layer.bindPopup(popupContent);

    },
    [selectedState]
  );


  // Update geoJsonComponent function
  const geoJsonComponent = useMemo(() => {
    const selectedData = selectedState == 'NY' ? CongressDistrict : CongressDistrict;
    if (!selectedData) return null;
    return (
      <GeoJSON
        key={`${selectedState}`}
        data={CongressDistrict}
        style={style}
        onEachFeature={onEachFeature}
      />
    );
  }, [selectedState, style, onEachFeature, CongressDistrict]);


  const mapCenter = selectedState === 'NY' ? nyCenter : arCenter;
  console.log(CongressDistrict);
  if (loading) {
    return <div>Loading map data...</div>;
  }
  return (
    <div>
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
