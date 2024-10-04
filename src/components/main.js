import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import RaceEthnicityContent from './state_raceEthnicity'; 
import ElectionVotesContent from './ElectionVotesContent';
import NYHouseEthnicityContent from './NYHouseEthnicityContent';
import CandidatesContent from './CandidatesContent';
import DistrictComparisonContent from './DistrictComparisonContent';
import VoteGapAnalysisContent from './VoteGapAnalysisContent';

// real data
import CountiesRaceEthnicity from './counties_raceEthnicity'
import Footer from './Footer';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/styles.css'; // Import your custom styles

function Main() {
  const [selectedState, setSelectedState] = useState('NY');
  const [selectedContent, setSelectedContent] = useState('mainContent'); // State for managing content selection
  const [selectedCounty, setSelectedCounty] = useState(null);

  const [fadeContent, setFadeContent] = useState(false); // State for managing fade effect for content
  const [isVisible, setIsVisible] = useState(false); // State for controlling visibility of main content


  useEffect(() => {
    setFadeContent(true); // Start fade-out effect when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true); // Make the content visible after fade-out
      setFadeContent(false); // Remove fade effect
    }, 500); // Wait for fade-out duration

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Run this effect only once when component mounts

  const resetSelection = () => {
    setSelectedCounty(null);
    setSelectedContent('mainContent');
  };
  const handleStateChange = (state) => {
    setFadeContent(true); // Trigger fade-out effect for content
    setTimeout(() => {
      setSelectedState(state); // Update selected state
      setFadeContent(false); // Trigger fade-in effect for content
    }, 500); // Wait for fade-out duration
  };

  const handlePlotChange = (content) => {
    setFadeContent(true); // Trigger fade-out effect for content
    setTimeout(() => {
      setSelectedContent(content); // Update state based on sidebar button click
      setFadeContent(false); // Trigger fade-in effect for content
    }, 500); // Wait for fade-out duration
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
      case 'mainContent':
        // return (
        // <CountiesRaceEthnicity 
        // countyName={selectedCounty}
        // selectedState={selectedState} />
        // )
        return <MainContent selectedState={selectedState} />; // Only show MainContent
      case 'raceEthnicity':
        return <RaceEthnicityContent selectedState={selectedState} />; // Only show RaceEthnicityContent
      case 'electionVotes':
        return <ElectionVotesContent selectedState={selectedState} />; // Updated to use selectedState
      case 'nyHouseEthnicity':
        return <NYHouseEthnicityContent selectedState={selectedState} />; // Renders content for NY House Ethnicity
      case 'candidates': // New case for Candidates content
        return <CandidatesContent selectedState={selectedState} />; // Renders content for Candidates
      case 'districtComparison': // New case for District Comparison content
        return <DistrictComparisonContent selectedState={selectedState} />; // Renders content for District Comparison
      // case 'countiesRaceEthnicity':
      //   return <CountiesRaceEthnicity selectedCounty={selectedCounty} />
      case 'voteGapAnalysis': // New case for Vote Gap Analysis content
        return <VoteGapAnalysisContent selectedState={selectedState} />; // Renders content for Vote Gap Analysis
      case 'countiesPopulationRace':
          return (
          <CountiesRaceEthnicity 
          countyName={selectedCounty}
          selectedState={selectedState} />
          )
      default:
        return <MainContent selectedState={selectedState} />; // Default to MainContent
    }
  };

  return (
    <div>
      <Navbar onStateChange={handleStateChange} />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-6 left-content rounded-section">
            <Sidebar 
            handlePlotChange={handlePlotChange}
            selectedCounty={selectedCounty}
            resetSelection={resetSelection} />

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
