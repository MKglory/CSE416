import React, { useState } from 'react'; // Removed useEffect from imports
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import RaceEthnicityContent from './RaceEthnicityContent'; 
import ElectionVotesContent from './ElectionVotesContent'; // Import other content components
import Footer from './Footer';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/styles.css'; // Import your custom styles

function Main() {
  const [selectedState, setSelectedState] = useState('NY');
  const [selectedContent, setSelectedContent] = useState('mainContent'); // State for managing content selection
  const [fade, setFade] = useState(false); // State for managing fade effect

  const handleStateChange = (state) => {
    setSelectedState(state);
  };

  const handleContentChange = (content) => {
    setFade(true); // Trigger fade-out effect
    setTimeout(() => {
      setSelectedContent(content); // Update state based on sidebar button click
      setFade(false); // Trigger fade-in effect
    }, 500); // Wait for fade-out duration
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'mainContent':
        return (
          <>
            <MainContent selectedState={selectedState} />
            <RaceEthnicityContent selectedState={selectedState} />
          </>
        );
      case 'raceEthnicity':
        return <RaceEthnicityContent selectedState={selectedState} />;
      case 'electionVotes':
        return (
          <ElectionVotesContent selectedCounty="Herkimer" selectedPrecinct="C LITTLE FALLS W1" />
        );
      default:
        return <MainContent selectedState={selectedState} />;
    }
  };

  return (
    <div>
      <Navbar onStateChange={handleStateChange} />
      <div className="container-fluid mt-4">
        <div className="row">
          {/* Sidebar section now on top of the left 50% */}
          <div className="col-md-6 left-content rounded-section">
            <Sidebar onContentChange={handleContentChange} />
            <div className={`content ${fade ? 'fade-out' : 'fade-in'}`}> {/* Added fade classes */}
              {renderContent()}
            </div>
          </div>

          {/* Map section stays on the right 50% */}
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
