import React, { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Footer from './Footer';
import MapComponent from '.s/MapComponent';

function App() {
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
          <MainContent selectedState={selectedState} />
        </div>
      </div>
      <MapComponent selectedState={selectedState} />
      <Footer />
    </div>
  );
}

export default App;
