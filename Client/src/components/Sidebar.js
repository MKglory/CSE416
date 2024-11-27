// Sidebar.js
import React from 'react';

function Sidebar({ handlePlotChange, selectedCounty, resetSelection, selectedContent }) {
  const handleSelect = (event) => {
    handlePlotChange(event.target.value);
  };

  return (
    <div className="sidebar">
      <ul className="list-group">
        <li className="list-group-item d-flex flex-row align-items-center justify-content-between">
          <select
            className="form-select"
            onChange={handleSelect}
            value={selectedContent}
            disabled={selectedCounty !== null}
            style={{ cursor: selectedCounty !== null ? 'not-allowed' : 'pointer' }} 
          >
            <option value="mainContent">Elections</option>
            <option value="raceEthnicity">Race & Ethnicity</option>
            <option value="electionVotes">Election Votes</option>
            <option value="nyHouseEthnicity">NY House of Representatives Ethnicity</option>
            <option value="candidates">Candidates</option>
            {/* <option value="districtComparison">District Comparison</option> */}
            <option value="voteGapAnalysis">Gingles 2/3 Analysis</option>
            <option value="householdIncome">Household Income</option> {/* New option added */}
            <option value="boxAndWhisker">Box and Whisker</option> {/* New option added */}
            <option value="stateDataSummary">State Data Summary</option> {/* New option added */}
            <option value="congressionalRepresentationTable">Congressional Representation Table</option> {/* New option added */}




          </select>

          {selectedCounty && (
            <li className="d-flex justify-content-center align-items-center" 
              style={{ paddingLeft: 17}} >
              <button onClick={resetSelection}
                className="btn btn-secondary btn-sm me-2"
                style={{ padding: '5px 15px' }} >
                Back
              </button>
            </li>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
