import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Elections from './Elections';
import RaceEthnicityContent from './state_raceEthnicity'; 
import ElectionVotesContent from './ElectionVotesContent';
import NYHouseEthnicityContent from './NYHouseEthnicityContent';
import CandidatesContent from './CandidatesContent';
import DistrictComparisonContent from './DistrictComparisonContent';
import VoteGapAnalysisContent from './VoteGapAnalysisContent';
import HouseholdIncomeContent from './HouseholdIncomeContent';
import Gingles from './Gingles.js'
import IE from './IE.js'

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
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [fadeContent, setFadeContent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    setFadeContent(true);
    const timer = setTimeout(() => {
      setIsVisible(true);
      setFadeContent(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const resetSelection = () => {
    setSelectedCounty(null);
    setSelectedContent('mainContent');
  };
  const handleStateChange = (state) => {
    setFadeContent(true);
    setTimeout(() => {
      setSelectedState(state); 
      setFadeContent(false); 
    }, 500);
  };

  const handlePlotChange = (content) => {
    setFadeContent(true); 
    setTimeout(() => {
      setSelectedContent(content);
      setFadeContent(false); 
    }, 500);
  };

  const renderContent = () => {
    if (selectedCounty) {
      return (
        <CountiesRaceEthnicity 
          countyName={selectedCounty}
          selectedState={selectedState} 
        />
      );
    }
    switch (selectedContent) {
      case 'elections':
        return <Elections selectedState={selectedState} />; 
      case 'raceEthnicity':
        return <RaceEthnicityContent selectedState={selectedState} />; 
      case 'electionVotes':
        return <ElectionVotesContent selectedState={selectedState} />; 
      case 'nyHouseEthnicity':
        return <NYHouseEthnicityContent selectedState={selectedState} />;
      case 'candidates':
        return <CandidatesContent selectedState={selectedState} />; 
      case 'districtComparison': 
        return <DistrictComparisonContent selectedState={selectedState} />; 
        case 'householdIncome':
          return <HouseholdIncomeContent selectedState={selectedState}/>; 
      case 'voteGapAnalysis':
        return <Gingles selectedState={selectedState}/>
    }
  };
  return (
    <div>
      <Navbar onStateChange={handleStateChange} />
      <div className="mainPage mt-4">
        <div className="row">
          <div className="col-md-6 left-content rounded-section">
            <Sidebar 
            handlePlotChange={handlePlotChange}
            selectedCounty={selectedCounty}
            resetSelection={resetSelection}
            selectedContent={selectedContent}  />

            <div className={`content ${fadeContent ? 'fade-out' : 'fade-in'} ${!isVisible ? 'd-none' : ''}`}> {/* Added fade classes for content */}
              {renderContent()}
            </div>
          </div>

          <div className="col-md-6 map-content rounded-section">
            <MapComponent
            selectedState={selectedState}
            setSelectedCounty={setSelectedCounty}
            handlePlotChange={handlePlotChange}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
