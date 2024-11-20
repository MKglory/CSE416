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
  const [data, setData] = useState(null);
  const [mapBoundary, setMapBoundary] = useState("districts");
  const [loading, setLoading] = useState(true);



  const mapDataRequest = async () => {
    const response = await axios.get(`http://localhost:8080/maps/${selectedState}/${mapBoundary}`);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    mapDataRequest();
  }, [selectedState, mapBoundary]);

  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, 7);
    }, [center]);
    return null;
  }
  function MapBoundaryChangeHandler(type){
    setMapBoundary(type);
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
      var ELECTION_RESULT = null;
      if (democratic_vote > republican_vote) {
        ELECTION_RESULT = 'Democratic';
      }
      else if (democratic_vote < republican_vote){
        ELECTION_RESULT = 'Republican';
      }
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
    []
  );

  // function readDistrictData(feature){
  //   const DistrictNum = feature.properties.NAME.match(/\d+/);
  //   const districtKey = `District ${DistrictNum}`;
  //   const districtData = selectedState == 'AR' ? ar_races[districtKey] : ny_races[districtKey];
  //   return districtData;
  // }
  // onEachFeature function
  const onEachFeature = useCallback(
    (feature, layer) => {
      const democratic_vote = feature.properties.Democratic_votes;
      const republican_vote = feature.properties.Republican_votes;
      var ELECTION_RESULT = null;
      if (democratic_vote > republican_vote) {
        ELECTION_RESULT = 'Democratic';
      }
      else if (democratic_vote < republican_vote){
        ELECTION_RESULT = 'Republican';
      }
      let popupContent = '';
      if (mapBoundary === 'districts') {
        // const districtData = readDistrictData(feature);
        popupContent = `
          <h5>Congress District: ${feature.properties.NAME}</h5>
          <p>Total Population: ${feature.properties.CVAP_Total}
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
        `;
      }
      else if (mapBoundary === 'county'){
        popupContent = `
          <h5>County: ${feature.properties.NAME}</h5>
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
       `;
      }
      else if (mapBoundary === 'precincts'){
        popupContent = `
          <h5>Preinct: ${feature.properties.PRECINCT}</h5>
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
        `;
      }

      layer.bindPopup(popupContent);

    },
    [selectedState, mapBoundary]
  );

  // Update geoJsonComponent function
  const geoJsonComponent = useMemo(() => {
    //const selectedData = CongressDistrict == 'NY' ? CongressDistrict : CongressDistrict;
    if (loading) return null;
    return (
      <GeoJSON
        key={`${selectedState}`}
        data={data}
        style={style}
        onEachFeature={onEachFeature}
      />
    );
  }, [selectedState, style, onEachFeature, data]);


  const mapCenter = selectedState === 'NY' ? nyCenter : arCenter;

  return (
    <div>
      <div style={{ display: 'flex', width: '100%'}}>
        <ul className="list-group">
          <li className="list-group-item">
            <select className="form-select" onChange={(e) => MapBoundaryChangeHandler(e.target.value)}>
              <option value="districts">Districts</option>
              <option value="county">Counties</option>
              <option value="precincts">Precincts</option>
            </select>
          </li>
        </ul>
        {/* {mapType === 'counties'?
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
      } */}
      </div>
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
          {loading ? null : geoJsonComponent}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapComponent;