import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import nyData from '../data/ny_districts.json';
//import arData from '../data/ar_districts.geojson';
import L from 'leaflet';
//import './MapComponent.css';

function MapComponent({ selectedState }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    if (selectedState === 'NY') {
      setGeoData(nyData);
    } 
    // else if (selectedState === 'AR') {
    //   setGeoData(arData);
    // }
  }, [selectedState]);

  const onEachFeature = (feature, layer) => {
    if (feature.properties) {
      const popupContent = `
        <h5>District: ${feature.properties.DISTRICT}</h5>
        <p>Population: ${feature.properties.POPULATION}</p>
        <p>Election Result: ${feature.properties.ELECTION_RESULT}</p>
      `;
      layer.bindPopup(popupContent);
    }
  };

  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.ELECTION_RESULT),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  };

  const getColor = (d) => {
    return d === 'Republican' ? '#ff0000' :
           d === 'Democratic' ? '#0000ff' :
           '#00ff00';
  };

  return (
    <MapContainer center={[37.8, -96]} zoom={4} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData && (
        <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
      )}
    </MapContainer>
  );
}

export default MapComponent;
