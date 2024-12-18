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

function MapComponent({ selectedState, selectedId, setSelectedId }) {
  const [boundaryData, setBoundaryData] = useState(null);
  const [heatMapData, setHeatMapData] = useState(null);
  const [mapBoundary, setMapBoundary] = useState("Districts");
  const [heatMap, setHeatMap] = useState('None');
  const [mapLoading, setMapLoading] = useState(true);
  const [heatMapDataLoading, setHeatMapDataLoading] = useState(false);
  const [colors, setColors] = useState(null);
  const [selectedRace, setSelectedRace] = useState('white')
  const [selectedIncome, setSelectedIncome] = useState('income')
  const [incomeData, setIncomeData] = useState(null);
  const layerRefs = useRef({});
  const previousState = useRef(null);

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
    console.log(response.data);
    setHeatMapDataLoading(false)
  }
  const incomeRequest = async () => {
    const response = await axios.get(`http://localhost:8080/heatmaps/${selectedState}/${mapBoundary}/Income`);
    setIncomeData(response.data.data);
    console.log("income", response.data.data);
    setHeatMapDataLoading(false)

  }
  useEffect(() => {
    setHeatMapDataLoading(true);
    setMapLoading(true);
    incomeRequest()
  },[selectedState, mapBoundary])

  useEffect(() => {
    setMapLoading(true);
    mapDataRequest();
  }, [selectedState, mapBoundary, heatMap]);

  useEffect(() => {
    if (heatMap !== "None"){
      setHeatMapDataLoading(true);
      heatMapRequest();
    }
  }, [selectedState, mapBoundary, heatMap]);

  function ChangeMapView({ center, selectedState, previousState  }) {
    const map = useMap();
    useEffect(() => {
      if (previousState.current !== selectedState) {
        map.flyTo(center, 6.7);
        previousState.current = selectedState; 
      }
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
  const getFillColor = (value, colors, selectedCatogory) => {
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
        if (value > thresholds[i] && value <= thresholds[i + 1]) {
          return colorArray[i];
        }
      }
      return colorArray[colorArray.length - 1];
    }
    else if (heatMap == 'RegionType'){
      const labels = colors[selectedCatogory + "Labels"];
      for (let i = 0; i < labels.length; i++){
        if (value === labels[i])
          return colors[selectedCatogory][i]
      }
      return colors[selectedCatogory][2];
    }else if (heatMap == "Election"){
      const thresholds = colors["incomeThreshold"];
      const colorArray = colors[selectedCatogory];
      if (value <= thresholds[0]) return colorArray[0];
      for (let i = 0; i < thresholds.length - 1; i++) {
        if (value > thresholds[i] && value <= thresholds[i + 1]) {
          return colorArray[i];
        }
      }
      return colorArray[colorArray.length - 1];
    }
  }

  // Style function
  const style = (
    (feature) => {
      let matchingMapEntry = null;
      let income = null;
      if (mapBoundary === 'Districts' && heatMapData != null && incomeData != null){
        const cd = feature.properties.CD;
        matchingMapEntry = heatMapData.find((entry) => entry.cd === cd);
        income = incomeData.find((entry) => entry.cd === cd);
      }
      else if (mapBoundary === "Precincts" && heatMapData != null && incomeData != null){
        const precinctID = feature.properties.PrecinctID;
        matchingMapEntry = heatMapData.find((entry) => entry.precinctID === precinctID);
        income = incomeData.find((entry) => entry.precinctID === precinctID);
      }
      let fillColor = "lightblue";
      if (heatMap === 'Election'){
        if (heatMapData != null && colors != null){
          if (matchingMapEntry) {
            let winner = (matchingMapEntry.democraticVotes > matchingMapEntry.republicanVotes)
            ? "Democratic" : "Republican";
            console.log("generateElectionPopup", income);
            const incomeMean = income['incomeMean'];
            fillColor = getFillColor(incomeMean, colors, "income"+winner)
            console.log(fillColor);
            // fillColor = colors[winner];
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
            fillColor = getFillColor(value, colors, selectedIncome);
          }      
        }
      }
      else if (heatMap === "RegionType"){
        if (heatMapData != null && colors != null){ 
          const regionType = matchingMapEntry.regionType;
          fillColor = getFillColor(regionType, colors, "regionType");
        }
      }
      const uniqueId = mapBoundary === 'Districts' ? feature.properties.CD : feature.properties.PrecinctID;
      const isSelected = uniqueId === selectedId;
  
      return {
        fillColor: fillColor,
        color: 'black',
        weight: 0.7, // Thicker border if selected
        opacity: 1,
        fillOpacity: 1,
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
  
  function generateIncomePopup(matchingMapEntry) {
    const formattedIncome = matchingMapEntry.incomeMean.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedPovertyHouseholds = matchingMapEntry.povertyHouseholds.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const formattedPovertyPercentage = matchingMapEntry.povertyPercentage.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `
      <p>Average Household Income: ${formattedIncome}</p>
      <p>Poverty Household Number: ${formattedPovertyHouseholds}</p>
      <p>Poverty Household Percentage: ${formattedPovertyPercentage}</p>
    `;
  }
  
  function generateElectionPopup(matchingMapEntry) {
    return `
      <p>Democratic votes: ${matchingMapEntry.democraticVotes}</p>
      <p>Republican votes: ${matchingMapEntry.republicanVotes}</p>

    `;
  }
  const formatIncome = (income) => {
    const inThousands = income / 1000; // Convert to thousands
    return `$${Math.round(inThousands).toLocaleString('en-US')}K`;
  };
  const onEachFeature = (
    (feature, layer) => {
      // Restrieve a unique id for current layer
      const uniqueId = mapBoundary === 'Districts' ? feature.properties.CD : feature.properties.PrecinctID;
      layerRefs.current[uniqueId] = layer;
      let popupContent = "";
      let matchingMapEntry = null;
      let income = null;
      if (mapBoundary === 'Districts' && heatMapData != null && incomeData != null){
        const cd = feature.properties.CD;
        matchingMapEntry = heatMapData.find((entry) => entry.cd === cd);
        income = incomeData.find((entry) => entry.cd === cd);
      }
      else if (mapBoundary === "Precincts" && heatMapData != null && incomeData != null){
        const precinctID = feature.properties.PrecinctID;
        matchingMapEntry = heatMapData.find((entry) => entry.precinctID === precinctID);
        income = incomeData.find((entry) => entry.precinctID === precinctID);
      }
      if ((mapBoundary === 'Districts' || mapBoundary === 'Precincts') && heatMapData != null && incomeData != null) {
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
            popupContent += `<p>Average Income ${formatIncome(income['incomeMean'])}`;
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
          weight: 0.7, // Default border thickness
        });
      }
    });

    if (selectedId && layerRefs.current[selectedId]) {
      layerRefs.current[selectedId].setStyle({
        color: '#ff0000', // Highlight border color
        weight: 4,         // Highlight border thickness
      });

      // Bring the selected layer to front**
      layerRefs.current[selectedId].bringToFront();
      // layerRefs.current[selectedId].openPopup();
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
                {mapBoundary==='Precincts' && <option value="RegionType">Region Type</option>}
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
          maxZoom={20}
          minZoom={5}
          scrollWheelZoom={true}
          preferCanvas={true}
        >
        <ChangeMapView center={mapCenter} selectedState={selectedState} previousState={previousState} />
        <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            maxZoom={20}
          />
          {(heatMapDataLoading || mapLoading) ? null : geoJsonComponent}
        </MapContainer>
      </div>
      <Legend colors={colors} selectedRace={selectedRace} heatMap={heatMap} selectedIncome={selectedIncome} extraForElection="incomeDemocratic"/>
    </div>
  );
}
const Legend = ({ colors, selectedRace, heatMap, selectedIncome }) => {
  if (!colors || heatMap === "None") return null;
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
  else if (heatMap === 'RegionType'){
    labels = colors["regionTypeLabels"];
    legandColors = colors["regionType"];
  }
  else if (heatMap == "Election"){
    labels = [...colors["incomeLabels"], ...colors["incomeLabels"]];
    legandColors = [...colors["incomeDemocratic"], ...colors["incomeRepublican"]];
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