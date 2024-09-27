import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import nyData from '../data/ny_districts.json';
import arData from '../data/ar_Boundaries_ELECTION_PRECINCTS_polygon.json';
import { memo } from 'react';

const nyCenter = [42.965, -76.0167];
const arCenter = [34.7465, -92.2896];

const usBounds = [
  [24.396308, -124.848974], // Southwest
  [49.384358, -66.885444]   // Northeast
];

function MapComponent({ selectedState }) {
  const [geoData, setGeoData] = useState(null);


  function ChangeMapView({ center }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo(center, 7);
    }, [center, map]);
    return null;
  }

  // useCallback to cache getColor function avoing rerender
  const getColor = useCallback((result) => {
    return result === 'Republican'
      ? '#ff0000'//red
      : result === 'Democratic'
      ? '#0000ff'//blue
      : '#00ff00';//green
  }, []);

  // useCallback to cache style fucntion
  const style = useCallback((feature) => ({
    fillColor: getColor(feature.properties.ELECTION_RESULT),
    weight: 2,
    opacity: 1,
    color: 'grey',
    dashArray: '3',
    fillOpacity: 0.7
  }), [getColor]);



  //useCallback to cache click data
  const onEachFeature = useCallback((feature, layer) => {
    if (feature.properties) {
      const popupContent = `
        <h5>District: ${feature.properties.DISTRICT}</h5>
        <p>Population: ${feature.properties.POPULATION}</p>
        <p>Election Result: ${feature.properties.ELECTION_RESULT}</p>
      `;
      layer.bindPopup(popupContent);
    }
  }, []);

  // use useMemo to cache
  const geoJsonComponent = useMemo(() => {
    if (!geoData) return null;
    return (
      <GeoJSON data={geoData} style={style} onEachFeature={onEachFeature} />
    );
  }, [geoData, style, onEachFeature]);

  // loading specific GeoJSON date depending on the state
  useEffect(() => {
    if (selectedState === 'NY') {
      setGeoData(nyData);
    }
    else if (selectedState === 'AR') {
      setGeoData(arData);
    }
  }, [selectedState]);

  const mapCenter = selectedState === 'NY' ? nyCenter : arCenter;

  return (
    <div style={{ paddingLeft: '30px', paddingRight: '30px' }}>
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
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        {geoJsonComponent}



      </MapContainer>
    </div>
  );
}

export default memo(MapComponent);
