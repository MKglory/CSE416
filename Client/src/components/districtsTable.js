import React, { useState, useEffect } from "react";
import axios from "axios";

function CongressionalTable({ selectedState }) {
  const [districtData, setDistrictData] = useState(null);
  const [loading, setLoading] = useState(false); 

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const districtsPerPage = 10; 

  useEffect(() => {
    if (!selectedState) return;
    setLoading(true);
    setCurrentPage(1); 
    axios
      .get(`http://localhost:8080/${selectedState}/DistrictsTable`)
      .then((response) => {
        setDistrictData(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
        setLoading(false);
      });
  }, [selectedState]);

  const indexOfLastDistrict = currentPage * districtsPerPage;
  const indexOfFirstDistrict = indexOfLastDistrict - districtsPerPage;
  const currentDistricts = districtData
    ? districtData.slice(indexOfFirstDistrict, indexOfLastDistrict)
    : [];

  const totalPages = districtData
    ? Math.ceil(districtData.length / districtsPerPage)
    : 0;

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const formatIncome = (income) => {
    const inThousands = income / 1000; // Convert to thousands
    return `$${Math.round(inThousands).toLocaleString('en-US')}K`;
  };

  const formatPercentage = (value) => {
    return value.toFixed(2) + "%";
  };

  if (loading || !districtData) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px", width: "100%", overflowX: "auto" }}>
      {!loading && districtData.length > 0 && (
        <>
          <table className='districtTable' border="1" cellPadding="10" cellSpacing="0">
            <thead>
              <tr>
                <th>District</th>
                <th>Representative</th>
                <th>Racial/Ethnicity</th>
                <th>Party</th>
                <th>Avg Household Income</th>
                <th>Poverty %</th>
                <th>Vote Margin</th>
                <th>Rural POP%</th>
                <th>Suburban POP%</th>
                <th>Urban POP%</th>
              </tr>
            </thead>
            <tbody>
              {currentDistricts.map((district, index) => (
                <tr key={index}>
                  <td>{district.district}</td>
                  <td>{district.representative}</td>
                  <td>{district.racialEthnicity}</td>
                  <td>{district.party}</td>
                  <td>{formatIncome(district.avgHouseholdIncome)}</td>
                  <td>{formatPercentage(district.povertyPercent)}</td>
                  <td>{formatPercentage(district.voteMargin)}</td>
                  <td>{formatPercentage(district.ruralPopPercent)}</td>
                  <td>{formatPercentage(district.suburbanPopPercent)}</td>
                  <td>{formatPercentage(district.urbanPopPercent)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              style={{ padding: "8px 16px", marginRight: "10px" }}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              style={{ padding: "8px 16px", marginLeft: "10px" }}
            >
              Next
            </button>
          </div>
        </>
      )}

      {!loading && districtData.length === 0 && selectedState !== "default" && (
        <p>No data available for the selected state.</p>
      )}
    </div>
  );
}

export default CongressionalTable;
