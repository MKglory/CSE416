import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SummaryTable from "./SummaryTable";

// real data
import CountiesRaceEthnicity from './counties_raceEthnicity'
import Footer from './Footer';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/styles.css'; // Import your custom styles

function Main() {
  const [selectedState, setSelectedState] = useState('NY');
  const [selectedContent, setSelectedContent] = useState('elections');

  const handleStateChange = (state) => {
    setSelectedState(state); 
  };

  const handlePlotChange = (content) => {
    setSelectedContent(content);
  };

  return (
    <div>
      <Navbar onStateChange={handleStateChange}/>
      <div className="mainPage mt-4">
        <div className="row">
          <SummaryTable
          selectedState={selectedState}/>
          <div className="col-md-6 left-content rounded-section">
            <Sidebar 
            handlePlotChange={handlePlotChange}
            selectedContent={selectedContent}
            selectedState={selectedState}/>
          </div>

          <div className="col-md-6 map-content rounded-section" >
            <MapComponent
            selectedState={selectedState}
            handlePlotChange={handlePlotChange}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
