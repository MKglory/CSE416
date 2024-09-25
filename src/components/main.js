import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import RaceEthnicityContent from './RaceEthnicityContent'; 
import Footer from './Footer';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/styles.css'; // Import your custom styles

function Main() {
  const [selectedState, setSelectedState] = useState('NY');

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  return (
    <div>
      <Navbar onStateChange={handleStateChange} />
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Left 50% section */}
          <div className="col-md-6 left-content rounded-section">
            <MainContent selectedState={selectedState} />
            <RaceEthnicityContent selectedState={selectedState} />
          </div>
          {/* Right 50% section for the map */}
          <div className="col-md-6 map-content rounded-section">
            <MapComponent selectedState={selectedState} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
