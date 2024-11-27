import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar'; // For Graph Sidebar
import TableSidebar from './TableSidebar'; // For Table Sidebar
import Elections from './Elections';
import RaceEthnicityContent from './state_raceEthnicity';
import ElectionVotesContent from './ElectionVotesContent';
import NYHouseEthnicityContent from './NYHouseEthnicityContent';
import CandidatesContent from './CandidatesContent';
import DistrictComparisonContent from './DistrictComparisonContent';
import VoteGapAnalysisContent from './VoteGapAnalysisContent';
import HouseholdIncomeContent from './HouseholdIncomeContent';
import Gingles from './Gingles.js';
import BoxAndWhiskerContent from './BoxAndWhiskerContent'; // Graph Content
import StateDataSummaryContent from './StateDataSummaryContent'; // Graph Content
import CongressionalRepresentationTableContent from './CongressionalRepresentationTableContent'; // Table Content
import Footer from './Footer';
import MapComponent from './MapComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/styles.css'; // Import custom styles

function Main() {
  const [selectedState, setSelectedState] = useState('NY');
  const [selectedTableContent, setSelectedTableContent] = useState('mainTableContent'); // State for table content
  const [selectedGraphContent, setSelectedGraphContent] = useState('mainGraphContent'); // State for graph content
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [fadeTableContent, setFadeTableContent] = useState(false); // Fade state for table
  const [fadeGraphContent, setFadeGraphContent] = useState(false); // Fade state for graph
  const [isTableVisible, setIsTableVisible] = useState(false); // Visibility for table
  const [isGraphVisible, setIsGraphVisible] = useState(false); // Visibility for graph

  useEffect(() => {
    setFadeTableContent(true);
    const tableTimer = setTimeout(() => {
      setIsTableVisible(true);
      setFadeTableContent(false);
    }, 500);

    return () => clearTimeout(tableTimer);
  }, []); // Initialize table visibility on mount

  useEffect(() => {
    setFadeGraphContent(true);
    const graphTimer = setTimeout(() => {
      setIsGraphVisible(true);
      setFadeGraphContent(false);
    }, 500);

    return () => clearTimeout(graphTimer);
  }, []); // Initialize graph visibility on mount

  const resetSelection = () => {
    setSelectedCounty(null);
    setSelectedTableContent('mainTableContent');
    setSelectedGraphContent('mainGraphContent');
  };

  const handleTableChange = (content) => {
    setFadeTableContent(true);
    setTimeout(() => {
      setSelectedTableContent(content);
      setFadeTableContent(false);
    }, 500);
  };

  const handleGraphChange = (content) => {
    setFadeGraphContent(true);
    setTimeout(() => {
      setSelectedGraphContent(content);
      setFadeGraphContent(false);
    }, 500);
  };

  const handleStateChange = (state) => {
    setFadeTableContent(true);
    setFadeGraphContent(true);
    setTimeout(() => {
      setSelectedState(state);
      setFadeTableContent(false);
      setFadeGraphContent(false);
    }, 500);
  };

const renderTableContent = () => {
  switch (selectedTableContent) {
    case 'congressionalRepresentationTable':
      return <CongressionalRepresentationTableContent selectedState={selectedState} />;
    case 'householdIncome':
      return <HouseholdIncomeContent selectedState={selectedState} />;
    default:
      return <p>Please select a table from the sidebar.</p>;
  }
};

  const renderGraphContent = () => {
    switch (selectedGraphContent) {
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
        return <HouseholdIncomeContent selectedState={selectedState} />;
      case 'voteGapAnalysis':
        return <Gingles selectedState={selectedState} />;
      case 'boxAndWhisker':
        return <BoxAndWhiskerContent selectedState={selectedState} />;
      case 'stateDataSummary':
        return <StateDataSummaryContent selectedState={selectedState} />;
      default:
        return <p>Please select a graph from the sidebar.</p>;
    }
  };

  return (
    <div>
      <Navbar onStateChange={handleStateChange} />
      <div className="mainPage mt-4">
        <div className="row">
          {/* Left Column: Table + Graph */}
          <div className="col-md-6 d-flex flex-column">
            {/* Table Section */}
            <div className="table-section mb-4">
              <TableSidebar
                handlePlotChange={handleTableChange}
                selectedCounty={selectedCounty}
                resetSelection={resetSelection}
                selectedContent={selectedTableContent}
              />
              <div
                className={`content ${fadeTableContent ? 'fade-out' : 'fade-in'} ${
                  !isTableVisible ? 'd-none' : ''
                }`}
              >
                {renderTableContent()}
              </div>
            </div>

            {/* Graph Section */}
            <div className="graph-section">
              <Sidebar
                handlePlotChange={handleGraphChange}
                selectedCounty={selectedCounty}
                resetSelection={resetSelection}
                selectedContent={selectedGraphContent}
              />
              <div
                className={`content ${fadeGraphContent ? 'fade-out' : 'fade-in'} ${
                  !isGraphVisible ? 'd-none' : ''
                }`}
              >
                {renderGraphContent()}
              </div>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="col-md-6 map-content rounded-section">
            <MapComponent
              selectedState={selectedState}
              setSelectedCounty={setSelectedCounty}
              handlePlotChange={handleGraphChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Main;
