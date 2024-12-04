import React, { useState, useEffect } from "react";
import axios from "axios";

// Placeholder data for testing
const mockData = [
  {
    district: "District 1",
    representative: "John Doe",
    party: "Democrat",
    ethnicity: "White",
    avgHouseholdIncome: "$75,000",
    povertyPercentage: "10%",
    regionType: {
      rural: "20%",
      urban: "50%",
      suburban: "30%",
    },
    voteMargin: "15%",
  },
  {
    district: "District 2",
    representative: "Jane Smith",
    party: "Republican",
    ethnicity: "Hispanic",
    avgHouseholdIncome: "$60,000",
    povertyPercentage: "12%",
    regionType: {
      rural: "40%",
      urban: "20%",
      suburban: "40%",
    },
    voteMargin: "8%",
  },
];

function CongressionalTable() {
  const [selectedState, setSelectedState] = useState("default"); // State selection
  const [districtData, setDistrictData] = useState(mockData); // Table data
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch district data when a state is selected
  useEffect(() => {
    if (selectedState === "default") return;

    setLoading(true);
    // Simulated API call
    axios
      .get(`http://localhost:8080/states/${selectedState}/districts`)
      .then((response) => {
        setDistrictData(response.data); // Replace with API data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
        setLoading(false);
      });
  }, [selectedState]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>State Congressional Representation</h1>

      {/* State Selector */}
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="state-select">Select a State:</label>
        <select
          id="state-select"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="default" disabled>
            Choose a state
          </option>
          <option value="ny">New York</option>
          <option value="ca">California</option>
          <option value="tx">Texas</option>
          {/* Add more states here */}
        </select>
      </div>

      {/* Loading Indicator */}
      {loading && <p>Loading district data...</p>}

      {/* Table */}
      {!loading && districtData.length > 0 && (
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>District</th>
              <th>Representative</th>
              <th>Party</th>
              <th>Ethnicity</th>
              <th>Avg Household Income</th>
              <th>Poverty %</th>
              <th>Region (R/U/S)</th>
              <th>Vote Margin</th>
            </tr>
          </thead>
          <tbody>
            {districtData.map((district, index) => (
              <tr key={index}>
                <td>{district.district}</td>
                <td>{district.representative}</td>
                <td>{district.party}</td>
                <td>{district.ethnicity}</td>
                <td>{district.avgHouseholdIncome}</td>
                <td>{district.povertyPercentage}</td>
                <td>
                  Rural: {district.regionType.rural}, Urban:{" "}
                  {district.regionType.urban}, Suburban:{" "}
                  {district.regionType.suburban}
                </td>
                <td>{district.voteMargin}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* No Data */}
      {!loading && districtData.length === 0 && selectedState !== "default" && (
        <p>No data available for the selected state.</p>
      )}
    </div>
  );
}

export default CongressionalTable;
