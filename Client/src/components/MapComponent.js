import React, { useEffect, useState, useMemo } from 'react';
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

function MapComponent({ selectedState, handlePlotChange }) {
  const [boundaryData, setBoundaryData] = useState(null);
  const [heatMapData, setHeatMapData] = useState(null);
  const [mapBoundary, setMapBoundary] = useState("Districts");
  const [heatMap, setHeatMap] = useState('None');
  const [mapLoading, setMapLoading] = useState(true);
  const [heatMapDataLoading, setHeatMapDataLoading] = useState(false);
  const [colors, setColors] = useState(null);
  const [selectedRace, setSelectedRace] = useState('white')

  const mapDataRequest = async () => {
    const response = await axios.get(`http://localhost:8080/maps/${selectedState}/${mapBoundary}`);
    setBoundaryData(response.data);
    console.log(response.data)
    setMapLoading(false);
  };
  const heatMapRequest = async () => {
    const response = await axios.get(`http://localhost:8080/heatmaps/${selectedState}/${mapBoundary}/${heatMap}`);
    setHeatMapData(response.data.data);
    setColors(response.data.colors);
    console.log(response.data)
    setHeatMapDataLoading(false);
  }

  useEffect(() => {
    setMapLoading(true);
    mapDataRequest();
  }, [selectedState, mapBoundary]);

  useEffect(() => {
    if (heatMap !== "None"){
      setHeatMapDataLoading(true);
      heatMapRequest();
    }
  }, [selectedState, mapBoundary, heatMap]);

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
    if (type === 'None') {setHeatMapData(null);}
    setHeatMap(type);
  }
  function selectedRaceChangeHandler(race){
    setSelectedRace(race);
  }
  const getFillColor = (value, colors, selectedCatogory) => {
    if (heatMap == 'Demography'){
      // const thresholds = [0.01, 0.1, 0.2, 0.4, 0.7];
      const thresholds = colors.demographicThreshold;
      const colorArray = colors[selectedCatogory];
      if (value <= thresholds[0]) return colorArray[0];
      for (let i = 0; i < thresholds.length - 1; i++) {
        if (value > thresholds[i] && value <= thresholds[i + 1]) return colorArray[i + 1]
      }
      return colorArray[colorArray.length - 1];
    }
    else if (heatMap == "Income"){
      const numColors = colors[selectedCatogory].length;
      if (value <= 0) return colors[selectedCatogory][0]; 
      if (value >= 1) return colors[selectedCatogory][numColors - 1];
      const index = Math.floor(value * (numColors - 1));
      return colors[selectedCatogory][index];
    }
  }




  // Style function
  const style = (
    (feature) => {
      let matchingMapEntry = null;
      if (mapBoundary === 'Districts' && heatMapData != null){
        const cd = feature.properties.CD;
        matchingMapEntry = heatMapData.find((entry) => entry.cd === cd);
      }
      else if (mapBoundary === "Precincts" && heatMapData != null){
        const precinctID = feature.properties.PrecinctID;
        matchingMapEntry = heatMapData.find((entry) => entry.precinctID === precinctID);
      }
      let fillColor = "lightblue";
      if (heatMap === 'Election'){
        if (heatMapData != null && colors != null){
          if (matchingMapEntry) {
            let winner = (matchingMapEntry.democraticVotes > matchingMapEntry.republicanVotes)
            ? "democratic" : "republican";
            fillColor = colors[winner];
          }      
        }
      }
      else if (heatMap === "Demography"){
        if (heatMapData != null && colors != null){
          if (matchingMapEntry) {
            const normalizedValue = matchingMapEntry[`${selectedRace}Normalized`];
            fillColor = getFillColor(normalizedValue, colors, selectedRace);
          }      
        }
      }
      else if (heatMap === "Income"){
        if (heatMapData != null && colors != null){
          if (matchingMapEntry) {
            const normalizedValue = matchingMapEntry.incomeMeanNormalized;
            fillColor = getFillColor(normalizedValue, colors, "income");
          }      
        }
      }
      return {
        fillColor: fillColor,
        color: "black",
        opacity: 1,
        weight: 0.7,
        fillOpacity: 0.5,
       };
    }
   );
  const onEachFeature = (
    (feature, layer) => {
      let matchingMapEntry = null;
      if (mapBoundary === 'Districts' && heatMapData != null){
        const cd = feature.properties.CD;
        matchingMapEntry = heatMapData.find((entry) => entry.cd === cd);
      }
      else if (mapBoundary === "Precincts" && heatMapData != null){
        const precinctID = feature.properties.PrecinctID;
        matchingMapEntry = heatMapData.find((entry) => entry.precinctID === precinctID);
      }
      let popupContent = "";
      if (mapBoundary === 'Districts') {
        popupContent = `
        <p>${feature.properties.NAME}</p>
        `;
        if (heatMapData != null){
          if (matchingMapEntry){
            if (heatMap === 'Demography'){
              popupContent += `
                <p>Population: ${matchingMapEntry.total}</p>
                <p >White: ${matchingMapEntry.white}</p>
                <p>Black: ${matchingMapEntry.black}</p>
                <p>Asian: ${matchingMapEntry.asian}</p>
                <p>Hispanic: ${matchingMapEntry.hispanic}</p>
                <p>American Indian: ${matchingMapEntry.americanIndian}</p>
            `;
            }
            else if (heatMap === "Income"){
              const formattedIncome = matchingMapEntry.incomeMean.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              popupContent += `
                <p>Average Household Income: ${formattedIncome}</p>
            `;
            }
            else if (heatMap === 'Election'){
              popupContent += `
                <p>Demoratic votes: ${matchingMapEntry.democraticVotes}</p>
                <p>Republican votes: ${matchingMapEntry.republicanVotes}</p>

            `;
            }
          }
        }
      }
      else if (mapBoundary === 'Precincts'){
        popupContent = `
          <p>Precinct: ${feature.properties.PRECINCT}</p>
          `;
        if (heatMapData != null){
          if (matchingMapEntry){
            if (heatMap === 'Demography'){
              popupContent += `
                <p>Population: ${matchingMapEntry.total}</p>
                <p >White: ${matchingMapEntry.white}</p>
                <p>Black: ${matchingMapEntry.black}</p>
                <p>Asian: ${matchingMapEntry.asian}</p>
                <p>Hispanic: ${matchingMapEntry.hispanic}</p>
                <p>American Indian: ${matchingMapEntry.americanIndian}</p>
            `;
            }
            else if (heatMap === "Income"){
              const formattedIncome = matchingMapEntry.incomeMean.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              });
              popupContent += `
                <p>Average Household Income: ${formattedIncome}</p>
            `;
            }
            else if (heatMap === 'Election'){
              popupContent += `
                <p>Demoratic votes: ${matchingMapEntry.democraticVotes}</p>
                <p>Republican votes: ${matchingMapEntry.republicanVotes}</p>

            `;
            }
          }
        }
      }
      layer.bindPopup(popupContent);
    }
  );

  // Update geoJsonComponent function
  const geoJsonComponent = useMemo(() => {
    if (mapLoading || heatMapDataLoading) return null;
    return (
      <GeoJSON
        key={`${selectedState}`}
        data={boundaryData}
        style={style}
        onEachFeature={onEachFeature}
      />
    );
  }, [selectedState, style, onEachFeature, boundaryData, heatMap]);


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
                <option value="Election">Election</option>
              </select>
            </li>
          </ul>
          {
            heatMap === "Demography"
            ? <ul className="list-group">
                <li className="list-group-item">
                  <select className="form-select" value={selectedRace} onChange={(e) => selectedRaceChangeHandler(e.target.value)}>
                    <option value="white">White</option>
                    <option value="black">Black</option>
                    <option value="americanIndian">American Indian</option>
                    <option value="hispanic">Hispanic</option>
                    <option value="asian">Asian</option>
                  </select>
                </li>
              </ul>
            : null
          }
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
          {(heatMapDataLoading || mapLoading) ? null : geoJsonComponent}
        </MapContainer>
      </div>
      <Legend colors={colors} selectedRace={selectedRace} heatMap={heatMap} />

    </div>
  );
}
const Legend = ({ colors, selectedRace, heatMap }) => {
  if (!colors || heatMap === "None" || heatMap === 'Election') return null;
  const raceColors = (heatMap == 'Demography' ? colors[selectedRace]: colors['income']);
  const labels = colors.demographicLabels;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "0px",
        right: "10px",
        backgroundColor: "white",
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        fontSize: "12px",
        zIndex: 1000, // Ensure it appears above the map
      }}
    >
      <div>
        {raceColors.map((color, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: color,
                marginRight: "5px",
              }}
            ></div>
            <span>{labels[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


export default MapComponent;