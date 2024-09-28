import React from 'react';

function Sidebar({ onContentChange }) {
  const handleSelect = (event) => {
    onContentChange(event.target.value); // Pass the selected content type back to the parent
  };

  return (
<div className="sidebar">
    <h3>General Information</h3>
    <ul className="list-group">
        <li className="list-group-item">
            <select className="form-select" onChange={handleSelect} defaultValue="mainContent">
                <option value="mainContent">Main Content</option>
                <option value="raceEthnicity">Race & Ethnicity</option>
                <option value="electionVotes">Election Votes</option>
                <option value="nyHouseEthnicity">NY House of Representatives Ethnicity</option>
                <option value="candidates">Candidates</option> {/* Option for candidates */}
                <option value="districtComparison">District Comparison</option> {/* New option for district comparison */}
                <option value="voteGapAnalysis">Vote Gap Analysis</option> {/* New option for Vote Gap Analysis */}
            </select>
        </li>
    </ul>
</div>
  );
}

export default Sidebar;
