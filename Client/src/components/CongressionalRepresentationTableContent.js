import React, { useState, useEffect } from 'react';
import districtData from '../data/district_data.json'; // Mock data for districts

function CongressionalRepresentationTableContent({ selectedState }) {
  const [selectedGroup, setSelectedGroup] = useState('Black'); // Default racial/ethnic group
  const [selectedRegion, setSelectedRegion] = useState('All'); // Default region type
  const [districtDetails, setDistrictDetails] = useState([]); // Data for the table

  useEffect(() => {
    // Fetch the district details for the selected state
    const details = districtData[selectedState]?.details || [];
    setDistrictDetails(details);
  }, [selectedState]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <label>
          <strong>Select Group:</strong>
          <select
            value={selectedGroup}
            onChange={(e) => setSelectedGroup(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="Black">Black</option>
            <option value="Hispanic">Hispanic</option>
            <option value="Asian">Asian</option>
            <option value="White">White</option>
          </select>
        </label>
        <label style={{ marginLeft: '20px' }}>
          <strong>Select Region:</strong>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{ marginLeft: '10px' }}
          >
            <option value="All">All</option>
            <option value="Rural">Rural</option>
            <option value="Urban">Urban</option>
            <option value="Suburban">Suburban</option>
          </select>
        </label>
      </div>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>District</th>
            <th>Representative</th>
            <th>Party</th>
            <th>Racial/Ethnic Group</th>
            <th>Avg. Household Income</th>
            <th>% Below Poverty</th>
            <th>% Rural</th>
            <th>% Urban</th>
            <th>% Suburban</th>
            <th>Vote Margin (%)</th>
          </tr>
        </thead>
        <tbody>
          {districtDetails.map((district, index) => (
            <tr key={index}>
              <td>{district.districtNumber}</td>
              <td>{district.representative}</td>
              <td>{district.party}</td>
              <td>{district.ethnicGroup}</td>
              <td>{district.avgIncome}</td>
              <td>{district.belowPoverty}%</td>
              <td>{district.ruralPercentage}%</td>
              <td>{district.urbanPercentage}%</td>
              <td>{district.suburbanPercentage}%</td>
              <td>{district.voteMargin}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CongressionalRepresentationTableContent;
