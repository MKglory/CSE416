import React, { useState, useEffect } from 'react'; 
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import RaceEthnicityContent from './RaceEthnicityContent'; // Keep this import to use it later
import ElectionVotesContent from './ElectionVotesContent'; 
import CandidatesContent from './CandidatesContent'; // Import the CandidatesContent component
import DistrictComparisonContent from './DistrictComparisonContent'; // Import the DistrictComparisonContent component

import NYHouseEthnicityContent from './NYHouseEthnicityContent'; // Import the NYHouseEthnicityContent component

import VoteGapAnalysisContent from './VoteGapAnalysisContent'; // Import the VoteGapAnalysisContent component


import Footer from './Footer';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/styles.css'; // Import your custom styles

function Main() {
  const [selectedState, setSelectedState] = useState('NY');
  const [selectedContent, setSelectedContent] = useState('mainContent'); // State for managing content selection
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

  const handleStateChange = (state) => {
    setFadeContent(true); // Trigger fade-out effect for content
    setTimeout(() => {
      setSelectedState(state); // Update selected state
      setFadeContent(false); // Trigger fade-in effect for content
    }, 500); // Wait for fade-out duration
  };

  const handleContentChange = (content) => {
    setFadeContent(true); // Trigger fade-out effect for content
    setTimeout(() => {
      setSelectedContent(content); // Update state based on sidebar button click
      setFadeContent(false); // Trigger fade-in effect for content
    }, 500); // Wait for fade-out duration
  };

  const renderContent = () => {
    switch (selectedContent) {
      case 'mainContent':
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
      case 'voteGapAnalysis': // New case for Vote Gap Analysis content
        return <VoteGapAnalysisContent selectedState={selectedState} />; // Renders content for Vote Gap Analysis
      default:
        return <MainContent selectedState={selectedState} />; // Default to MainContent
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
            <div className={`content ${fadeContent ? 'fade-out' : 'fade-in'} ${!isVisible ? 'd-none' : ''}`}> {/* Added fade classes for content */}
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
