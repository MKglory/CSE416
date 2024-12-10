// Sidebar.js
import React, { useEffect } from 'react';
import Elections from './Elections';
import RaceEthnicityContent from './state_raceEthnicity'; 
import NYHouseEthnicityContent from './NYHouseEthnicityContent';
import CandidatesContent from './CandidatesContent';
import DistrictComparisonContent from './DistrictComparisonContent';
import DistrictsTable from './districtsTable';
import HouseholdIncomeContent from './HouseholdIncomeContent';
import Gingles from './Gingles.js'
import BoxAndWhiskerContent from './BoxAndWhiskerContent.js';
import IE from "./IE.js"
// import IE from './IE.js'

function Sidebar({ handlePlotChange, selectedState, selectedContent, selectedId, setSelectedId }) {
  const handleSelect = (event) => {
    handlePlotChange(event.target.value);
  };
  const renderContent = () => {
    switch (selectedContent) {
      case 'elections':
        return <Elections selectedState={selectedState} selectedContent={selectedContent}/>; 
      case 'raceEthnicity':
        return <RaceEthnicityContent selectedState={selectedState} />; 
      case 'districtsTable':
        return <DistrictsTable 
                  selectedState={selectedState}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}/>; 
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
      case 'boxWhisker':
        return <BoxAndWhiskerContent selectedState={selectedState}/>
      case 'IE':
        return <IE/>
    }
  };

  return (
    <div>
      <div className="sidebar">
        <ul className="list-group">
          <li className="list-group-item d-flex flex-row align-items-center justify-content-between">
            <select
              className="form-select"
              onChange={handleSelect}
              value={selectedContent}
            >
              <option value="elections">Elections</option>
              <option value="districtsTable">District Details</option>
              <option value="IE">Ecological Inference</option>
              {/* <option value="raceEthnicity">Race & Ethnicity</option>
              <option value="nyHouseEthnicity">NY House of Representatives Ethnicity</option>
              <option value="candidates">Candidates</option> */}
              {/* <option value="districtComparison">District Comparison</option> */}
              <option value="voteGapAnalysis">Gingles 2/3 Analysis</option>
              {/* <option value="householdIncome">Household Income</option> */}
              <option value="boxWhisker">Box & Whisker</option>
            </select>
          </li>
        </ul>
      </div>
      <div> 
        {renderContent()}
      </div>
    </div>
  );
}

export default Sidebar;
