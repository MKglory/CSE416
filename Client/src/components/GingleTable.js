import React, { useState, useEffect } from "react";
import axios from "axios";

function GinglesTable({ selectedState, selectedId }) {
  const [data, setData] = useState([]); // Fetched data
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 8; // Number of items per page
  const [manualPage, setManualPage] = useState(""); // For manual input

  useEffect(() => {
    if (!selectedState) return;

    setLoading(true);
    axios
      .get(`http://localhost:8080/${selectedState}/PrecinctsTable`)
      .then((response) => {
        setData(response.data); // Set the fetched data
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
        setLoading(false);
      });
  }, [selectedState]);

  useEffect(() => {
    if (!selectedId || data.length === 0) return;

    // Find the index of the selected ID
    const selectedIndex = data.findIndex((item) => item.precinctID === selectedId);

    if (selectedIndex !== -1) {
      // Calculate the page number containing the selected ID
      const selectedPage = Math.floor(selectedIndex / itemsPerPage) + 1;
      setCurrentPage(selectedPage);
    }
  }, [selectedId, data]);

  if (loading) return <div>Loading...</div>;

  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Slice data to show only items for the current page
  const displayedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to change the page
  const changePage = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Function to handle manual page input
  const handleManualPageChange = (e) => {
    setManualPage(e.target.value);
  };

  const goToManualPage = () => {
    const page = parseInt(manualPage, 10);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      alert(`Please enter a valid page number between 1 and ${totalPages}`);
    }
  };

  const formatIncome = (income) => {
    const inThousands = income / 1000; // Convert to thousands
    return `$${Math.round(inThousands).toLocaleString("en-US")}K`;
  };

  return (
    <div style={{ overflowX: "auto" }}>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          border: "1px solid black",
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>Precinct</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Total</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Region Type</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Average Income</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Republican</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Democratic</th>
          </tr>
        </thead>
        <tbody>
          {displayedData.map((precinct, index) => (
            <tr
              key={index}
              style={{
                backgroundColor:
                  precinct.precinctID === selectedId ? "#f0f8ff" : "white", // Highlight the selected ID
              }}
            >
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {precinct.name || "N/A"}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {precinct.Total || "N/A"}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {precinct.regionType || "N/A"}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {precinct.avgHouseholdIncome
                  ? `${formatIncome(precinct.avgHouseholdIncome)}`
                  : "N/A"}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {precinct.republican || "N/A"}
              </td>
              <td style={{ border: "1px solid black", padding: "8px" }}>
                {precinct.democratic || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div style={{ marginTop: "10px", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <button
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px", lineHeight: "30px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            margin: "0 5px",
            padding: "5px 10px",
            border: "1px solid black",
            cursor: "pointer",
          }}
        >
          Next
        </button>

        {/* Manual Page Input */}
        <div style={{ marginLeft: "20px", display: "flex", alignItems: "center" }}>
          <input
            type="number"
            value={manualPage}
            onChange={handleManualPageChange}
            placeholder="Go to page"
            style={{
              width: "60px",
              padding: "5px",
              border: "1px solid black",
              marginRight: "5px",
            }}
          />
          <button
            onClick={goToManualPage}
            style={{
              padding: "5px 10px",
              border: "1px solid black",
              cursor: "pointer",
            }}
          >
            Go
          </button>
        </div>
      </div>
    </div>
  );
}

export default GinglesTable;
