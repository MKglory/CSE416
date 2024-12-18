import React, { useState } from "react";
import IE_Analysis from './IE_analysis.js'
import IE_polarization from './IE_polarization.js'


const KDEPlotChartJS = ({ selectedState }) => {
  // State for selected region
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedDataType, setSelectedDataType] = useState("None");
  const [selectedRaceOrIncomeLevel, setSelectedRaceOrIncomeLevel] = useState("None");
  const [selectedGraph, setSelectedGraph] = useState("EI");
  const [selectedCandidate, setSelectedCandidate] = useState("None");
  const [group0, setGroup0] = useState("None");
  const [group1, setGroup1] = useState("None");


  const selectedDataTypeChangeHanlder = (type) =>{
    setSelectedDataType(type);
    setSelectedRaceOrIncomeLevel("None")
  }
  const selectedGraphChangeHanlder = (graph) => {
    setSelectedGraph(graph);
  }
  const selectedRaceOrIncomeLevelChangeHanlder = (race) =>{
    setSelectedRaceOrIncomeLevel(race)
  }
  const selectedRegioneChangeHanlder = (region) =>{
    setSelectedRegion(region);
  }
  const selectedCandidateChangeHandler = (candidate)=> {
    setSelectedCandidate(candidate);
  }
  const selectedGroup0ChangeHanlder = (type) =>{
    setGroup0(type);
  }
  const selectedGroup1ChangeHanlder = (type) =>{
    setGroup1(type);
  }
  const groups = ["Black", "White", "American_Indian", "Hispanic", "Asian"];

  const render = () =>{
    if (selectedGraph === 'EI'){
        return <IE_Analysis
                selectedRegion={selectedRegion}
                selectedCandidate={selectedCandidate}
                selectedDataType={selectedDataType}
                selectedState={selectedState}
                selectedRaceOrIncomeLevel={selectedRaceOrIncomeLevel}/>
    }
    else if (selectedGraph === "Polarization"){
        return <IE_polarization
                state={selectedState}
                group0={group0}
                group1={group1}
                candidate={selectedCandidate}/>
    }
  }
     
  return (
    <div>
      <div style={{ display: "flex", width: "100%" }}>
        <ul className="list-group">
          <li className="list-group-item">
            <select
              className="form-select"
              value={selectedGraph}
              onChange={(e) => selectedGraphChangeHanlder(e.target.value)}
            >
              <option value="None">None</option>
              <option value="EI">EI Analysis</option>
              <option value="Polarization">KDE Polarization</option>
            </select>
          </li>
        </ul>
  
        {selectedGraph === "EI" && (
          <>
            <ul className="list-group">
              <li className="list-group-item">
                <select
                  className="form-select"
                  value={selectedDataType}
                  onChange={(e) => selectedDataTypeChangeHanlder(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Demography">Demography</option>
                  <option value="Income">Income</option>
                </select>
              </li>
            </ul>
  
            {selectedDataType === "Demography" && (
              <ul className="list-group">
                <li className="list-group-item">
                  <select
                    className="form-select"
                    value={selectedRaceOrIncomeLevel}
                    onChange={(e) => selectedRaceOrIncomeLevelChangeHanlder(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="Black">Black</option>
                    <option value="White">White</option>
                    <option value="American_Indian">American Indian</option>
                    <option value="Hispanic">Hispanic</option>
                    <option value="Asian">Asian</option>
                  </select>
                </li>
              </ul>
            )}
  
            {selectedDataType === "Income" && (
              <ul className="list-group">
                <li className="list-group-item">
                  <select
                    className="form-select"
                    value={selectedRaceOrIncomeLevel}
                    onChange={(e) => selectedRaceOrIncomeLevelChangeHanlder(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="Less_than_30K">Less 30K</option>
                    <option value="30K_to_75K">30K to 75K</option>
                    <option value="75K_to_150K">75K to 150K</option>
                    <option value="150K_or_more">More than 150K</option>
                  </select>
                </li>
              </ul>
            )}
  
            <ul className="list-group">
              <li className="list-group-item">
                <select
                  className="form-select"
                  onChange={(e) => selectedCandidateChangeHandler(e.target.value)}
                >
                  <option value="None">None</option>
                  <option value="Trump">Trump</option>
                  <option value="Biden">Biden</option>
                </select>
              </li>
            </ul>
  
            <ul className="list-group">
              <li className="list-group-item">
                <select
                  className="form-select"
                  value={selectedRegion}
                  onChange={(e) => selectedRegioneChangeHanlder(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="Urban">Urban</option>
                  <option value="Suburban">Suburban</option>
                  <option value="Rural">Rural</option>
                </select>
              </li>
            </ul>
          </>
        )}
         {selectedGraph === "Polarization" && (
          <>
            <ul className="list-group">
              <li className="list-group-item">
                <select
                  className="form-select"
                  value={group0}
                  onChange={(e) => selectedGroup0ChangeHanlder(e.target.value)}
                >
                  <option value="None">None</option>
                  {groups
                    .filter((group) => group !== group1) // Hide group1 value
                    .map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                </select>
              </li>
            </ul>

            <ul className="list-group">
              <li className="list-group-item">
                <select
                  className="form-select"
                  value={group1}
                  onChange={(e) => selectedGroup1ChangeHanlder(e.target.value)}
                >
                  <option value="None">None</option>
                  {groups
                    .filter((group) => group !== group0) // Hide group0 value
                    .map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                </select>
              </li>
            </ul>
            <ul className="list-group">
                <li className="list-group-item">
                  <select
                    className="form-select"
                    onChange={(e) => selectedCandidateChangeHandler(e.target.value)}
                  >
                    <option value="None">None</option>
                    <option value="Trump">Trump</option>
                    <option value="Biden">Biden</option>
                  </select>
                </li>
              </ul>
          </>
        )}
      </div>
      {render()}
    </div>
  );
  
};

export default KDEPlotChartJS;
