import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import RaceEthnicityContent from './RaceEthnicityContent'; // Import the new component
import Footer from './Footer';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';

import '../stylesheets/styles.css';

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
          <Sidebar />
          {/* Display population distribution */}
          <MainContent selectedState={selectedState} />
          {/* Display race and ethnicity data */}
          <RaceEthnicityContent selectedState={selectedState} />
        </div>
      </div>
      {/* Display map for the selected state */}
      <MapComponent selectedState={selectedState} />
      <Footer />
    </div>
  );
}

export default Main;
