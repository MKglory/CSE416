import React, { useEffect, useState, useMemo, useRef } from 'react';
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

function MapComponent({ selectedState }) {
  const [boundaryData, setBoundaryData] = useState(null);
  const [heatMapData, setHeatMapData] = useState(null);
  const [mapBoundary, setMapBoundary] = useState("Districts");
  const [heatMap, setHeatMap] = useState('None');
  const [mapLoading, setMapLoading] = useState(true);
  const [heatMapDataLoading, setHeatMapDataLoading] = useState(false);
  const [colors, setColors] = useState(null);
  const [selectedRace, setSelectedRace] = useState('white')
  const [selectedIncome, setSelectedIncome] = useState('income')

  const [selectedId, setSelectedId] = useState(null);
  const layerRefs = useRef({});

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

  function ChangeMapView({ center, selectedState }) {
    const map = useMap();
    const previousState = useRef(selectedState);
    useEffect(() => {
      map.flyTo(center, 7);
      previousState.current = selectedState;

    }, [selectedState]);
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
  function selectedIncomeChangeHandler(incomeType){
    setSelectedIncome(incomeType);
  }
  const getFillColor = (value, colors, selectedCatogory) => {  //The colorArray is gotten from the server side
    if (heatMap == 'Demography'){
      const thresholds = colors.demographicThreshold;
      const colorArray = colors[selectedCatogory];
      if (value <= thresholds[0]) return colorArray[0];
      for (let i = 0; i < thresholds.length - 1; i++) {
        if (value > thresholds[i] && value <= thresholds[i + 1]) return colorArray[i + 1]
      }
      return colorArray[colorArray.length - 1];
    }
    else if (heatMap == 'Income'){
      const thresholds = colors[selectedCatogory + "Threshold"];
      const colorArray = colors[selectedCatogory];
      if (value <= thresholds[0]) return colorArray[0];
      for (let i = 0; i < thresholds.length - 1; i++) {
        if (value > thresholds[i] && value <= thresholds[i + 1]) return colorArray[i + 1]
      }
      return colorArray[colorArray.length - 1];
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
            const percentage = 'percent' + selectedRace.charAt(0).toUpperCase() + selectedRace.slice(1);
            const value = matchingMapEntry[percentage];
            fillColor = getFillColor(value, colors, selectedRace);
          }      
        }
      }
      else if (heatMap === "Income"){
        if (heatMapData != null && colors != null){
          if (matchingMapEntry) {
            let value = 0;
            if (selectedIncome === 'income'){
              value = matchingMapEntry.incomeMean;
            } 
            else if (selectedIncome === 'povertyLine'){
              value = matchingMapEntry.povertyPercentage;
            }
            fillColor = getFillColor(value, colors, selectedIncome); //// Determines the fill color for a feature based on its value (income or poverty), the server-provided color mappings and thresholds, and the selected income category.






          }      
        }
      }
      const uniqueId = mapBoundary === 'Districts' ? feature.properties.CD : feature.properties.PrecinctID;
      const isSelected = uniqueId === selectedId;
  
      return {
        fillColor: fillColor,
        color: isSelected ? '#ff0000' : 'black', // Red if selected, default blue otherwise
        weight: isSelected ? 4 : 0.7,               // Thicker border if selected
        opacity: 1,
        fillOpacity: 0.5,
      };
    }
   );
   function generateDemographyPopup(matchingMapEntry) {
    return `
      <p>Population: ${matchingMapEntry.total}</p>
      <p>White: ${matchingMapEntry.white}</p>
      <p>Black: ${matchingMapEntry.black}</p>
      <p>Asian: ${matchingMapEntry.asian}</p>
      <p>Hispanic: ${matchingMapEntry.hispanic}</p>
      <p>American Indian: ${matchingMapEntry.americanIndian}</p>
    `;
  }
  
// Function to generate a popup with income-related data for a map feature
function generateIncomePopup(matchingMapEntry) {
  // Format the average household income with two decimal places and comma separators for better readability
  const formattedIncome = matchingMapEntry.incomeMean.toLocaleString('en-US', {
      minimumFractionDigits: 2, // Always display at least two decimal places
      maximumFractionDigits: 2, // Limit the display to two decimal places
  });

  // Format the number of households below the poverty line with the same precision and separators
  const formattedPovertyHouseholds = matchingMapEntry.povertyHouseholds.toLocaleString('en-US', {
      minimumFractionDigits: 2, // Always display at least two decimal places
      maximumFractionDigits: 2, // Limit the display to two decimal places
  });

  // Format the percentage of households below the poverty line for display
  const formattedPovertyPercentage = matchingMapEntry.povertyPercentage.toLocaleString('en-US', {
      minimumFractionDigits: 2, // Always display at least two decimal places
      maximumFractionDigits: 2, // Limit the display to two decimal places
  });

  // Construct the HTML content for the popup, including all formatted values
  return `
    <p>Average Household Income: ${formattedIncome}</p> <!-- Displays average household income -->
    <p>Poverty Household Number: ${formattedPovertyHouseholds}</p> <!-- Displays the number of households below the poverty line -->
    <p>Poverty Household Percentage: ${formattedPovertyPercentage}</p> <!-- Displays the percentage of households below the poverty line -->
  `;
}


  
  function generateElectionPopup(matchingMapEntry) {
    return `
      <p>Democratic votes: ${matchingMapEntry.democraticVotes}</p>
      <p>Republican votes: ${matchingMapEntry.republicanVotes}</p>
    `;
  }
  
  const onEachFeature = (
    (feature, layer) => {
      // Restrieve a unique id for current layer
      const uniqueId = mapBoundary === 'Districts' ? feature.properties.CD : feature.properties.PrecinctID;
      layerRefs.current[uniqueId] = layer;
      let popupContent = "";
      let matchingMapEntry = null;
      if (mapBoundary === 'Districts' && heatMapData != null){
        const cd = feature.properties.CD;
        matchingMapEntry = heatMapData.find((entry) => entry.cd === cd);
      }
      else if (mapBoundary === "Precincts" && heatMapData != null){
        const precinctID = feature.properties.PrecinctID;
        matchingMapEntry = heatMapData.find((entry) => entry.precinctID === precinctID);
      }
      if (mapBoundary === 'Districts' || mapBoundary === 'Precincts') {
        popupContent = mapBoundary === 'Districts' 
          ? `<p>${feature.properties.NAME}</p>` 
          : `<p>Precinct: ${feature.properties.PRECINCT}</p>`;
        
        if (heatMapData && matchingMapEntry) {
          if (heatMap === 'Demography') {
            popupContent += generateDemographyPopup(matchingMapEntry);
          } else if (heatMap === 'Income') {
            popupContent += generateIncomePopup(matchingMapEntry);
          } else if (heatMap === 'Election') {
            popupContent += generateElectionPopup(matchingMapEntry);
          }
        }
      }
      layer.bindPopup(popupContent);
      // dfd
      layer.on('click', () => {
        setSelectedId(uniqueId);
      });
    }
  );
  useEffect(() => {
    Object.keys(layerRefs.current).forEach((key) => {
      const layer = layerRefs.current[key];
      if (layer) {
        layer.setStyle({
          color: '#black', // Default border color
          weight: 0.7,         // Default border thickness
        });
      }
    });

    if (selectedId && layerRefs.current[selectedId]) {
      layerRefs.current[selectedId].setStyle({
        color: '#ff0000', // Highlight border color
        weight: 4,         // Highlight border thickness
      });

      // **Bring the selected layer to front**
      layerRefs.current[selectedId].bringToFront();

      // **Optionally, open the popup**
      layerRefs.current[selectedId].openPopup();
    }
  }, [selectedId]);

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
          {
            heatMap === "Income"
            ? <ul className="list-group">
                <li className="list-group-item">
                  <select className="form-select" value={selectedIncome} onChange={(e) => selectedIncomeChangeHandler(e.target.value)}>
                    <option value="income">Averge Household</option>
                    <option value="povertyLine">Poverty Line</option>
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
        <ChangeMapView center={mapCenter} selectedState={selectedState} />
        <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          {(heatMapDataLoading || mapLoading) ? null : geoJsonComponent}
        </MapContainer>
      </div>
      <Legend colors={colors} selectedRace={selectedRace} heatMap={heatMap} selectedIncome={selectedIncome}/>

    </div>
  );
}
const Legend = ({ colors, selectedRace, heatMap, selectedIncome }) => {
  if (!colors || heatMap === "None" || heatMap === 'Election') return null;
  let legandColors = null;
  // if (heatMap == 'Demography')  ? colors[selectedRace]: colors['income']);
  let labels = null;
  if (heatMap === 'Demography'){
    labels = colors.demographicLabels;
    legandColors = colors[selectedRace];
  }
  else if (heatMap === 'Income'){
    labels = colors[selectedIncome + "Labels"];
    legandColors = colors[selectedIncome];
  }

  if (!legandColors || !labels) return;
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
        {legandColors.map((color, index) => (
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