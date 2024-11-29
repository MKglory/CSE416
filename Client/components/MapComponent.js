import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const nyCenter = [42.965, -76.0167];
const arCenter = [34.7465, -92.2896];
const usBounds = [
  [24.396308, -124.848974], // Southwest
  [49.384358, -66.885444],  // Northeast
];

function MapComponent({ selectedState, setSelectedCounty, handlePlotChange }) {
  const [data, setData] = useState(null);
  const [mapBoundary, setMapBoundary] = useState("Districts");
  const [heatMap, setHeatMap] = useState('None');
  const [loading, setLoading] = useState(true);
  const mapDataRequest = async () => {
    const response = await axios.get(`http://localhost:8080/maps/${selectedState}/${mapBoundary}`);
    setData(response.data);
    console.log(response.data)
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
  function HeatMapChangeHandler(type){
    setHeatMap(type);
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
      if (mapBoundary === 'Districts') {
        // const districtData = readDistrictData(feature);
        popupContent = `
          <h5>Congress District: ${feature.properties.NAME}</h5>
          <p>Total Population: ${feature.properties.CVAP_Total}
          <p>Democratic votes: ${democratic_vote}</p>
          <p>Republican votes: ${republican_vote}</p>
          <p>Election Result: ${ELECTION_RESULT}</p>
        `;
      }
      else if (mapBoundary === 'Precincts'){
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
    if (loading) return null;
    return (
      <GeoJSON
        key={`${selectedState}`}
        data={data}
        // style={style}
        // onEachFeature={onEachFeature}
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
                <option value="Districts">Districts</option>
                <option value="Precincts">Precincts</option>
              </select>
            </li>
          </ul>
          <ul className="list-group">
            <li className="list-group-item">
              <select className="form-select" value={heatMap} onChange={(e) => HeatMapChangeHandler(e.target.value)}>
                <option value="None">None</option>
                <option value="Demography">Demography</option>
                <option value="Income">Income</option>
              </select>
            </li>
          </ul>
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