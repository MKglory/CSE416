import React, { useState } from "react";
import IE_Analysis from './IE_analysis.js'
import IE_polarization from './IE_polarization.js'


const KDEPlotChartJS = ({ selectedState }) => {
  // State for selected region
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedDataType, setSelectedDataType] = useState("None");
  const [selectedRace, setSelectedRace] = useState("None");
  const [selectedGraph, setSelectedGraph] = useState("EI");
  const [selectedCandidate, setSelectedCandidate] = useState("None");

  const selectedDataTypeChangeHanlder = (type) =>{
    setSelectedDataType(type);
  }
  const selectedGraphChangeHanlder = (graph) => {
    setSelectedGraph(graph);
  }
  const selectedRaceChangeHanlder = (race) =>{
    setSelectedRace(race)
  }
  const selectedRegioneChangeHanlder = (region) =>{
    setSelectedRegion(region);
  }
  const selectedCandidateChangeHandler = (candidate)=> {
    setSelectedCandidate(candidate);
  }

  const render = () =>{
    if (selectedGraph === 'EI'){
        return <IE_Analysis
                selectedRegion={selectedRegion}
                selectedCandidate={selectedCandidate}
                selectedState={selectedState}/>
    }
    else if (selectedGraph === "Polarization"){
        return <IE_polarization
                selectedState={selectedState}/>
    }
  }
     
  return (
    <div>
        <div style={{ display: 'flex', width: '100%'}}>
            <ul className="list-group">
                <li className="list-group-item">
                    <select className="form-select" value={selectedGraph} onChange={(e) => selectedGraphChangeHanlder(e.target.value)}>
                         <option value="None">None</option>
                        <option value="EI">EI Analysis</option>
                        <option value="Polarization">KDE Polarization</option>
                    </select>
                </li>
            </ul>
            <ul className="list-group">
                <li className="list-group-item">
                    <select className="form-select" value={selectedDataType} onChange={(e) => selectedDataTypeChangeHanlder(e.target.value)}>
                        <option value="None">None</option>
                        <option value="Demography">Demography</option>
                        <option value="Income">Income</option>
                    </select>
                </li>
            </ul>
            {
            selectedDataType === "Demography"
            ? <ul className="list-group">
                <li className="list-group-item">
                  <select className="form-select" value={selectedRace} onChange={(e) => selectedRaceChangeHanlder(e.target.value)}>
                    <option value="None">None</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="americanIndian">American Indian</option>
                    <option value="hispanic">Hispanic</option>
                    <option value="asian">Asian</option>
                  </select>
                </li>
              </ul>
            : null
            }
            <ul className="list-group">
                <li className="list-group-item">
                    <select className="form-select" onChange={(e) => selectedCandidateChangeHandler(e.target.value)}>
                        <option value="None">None</option>
                        <option value="Trump">Trump</option>
                        <option value="Biden">Biden</option>
                    </select>
                </li>
            </ul>
            <ul className="list-group">
                <li className="list-group-item">
                    <select className="form-select" value={selectedRegion} onChange={(e) => selectedRegioneChangeHanlder(e.target.value)}>
                      <option value="All">All</option>
                        <option value="Urban">Urban</option>
                        <option value="Suburban">Suburban</option>
                        <option value="Rural">Rural</option>
                    </select>
                </li>
            </ul>

        </div>
        {render()}
    </div>
  );
};

export default KDEPlotChartJS;
