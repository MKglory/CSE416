import axios from 'axios'; // Import axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Import React and hooks for state and side-effects
import { Pie } from 'react-chartjs-2'; // Import Pie chart component from chartjs-2
import {
  Chart as ChartJS, // Import core Chart.js functionality
  ArcElement, // Import the ArcElement used for rendering arcs in Pie charts
  Tooltip, // Import Tooltip to display information on hover
  Legend, // Import Legend for chart labels
} from 'chart.js'; // Import Chart.js components

// Register Chart.js components needed for pie chart functionality
ChartJS.register(ArcElement, Tooltip, Legend);

function ElectionVotesContent({ selectedState }) {
  const [filteredVotesData, setFilteredVotesData] = useState([]); // State to hold filtered votes data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage any errors during data fetch

  useEffect(() => {
    let apiUrl = ''; // Variable to hold the API URL

    // Determine the correct API URL based on selectedState (New York or Arkansas)
    if (selectedState === 'NY') {
      apiUrl = 'http://localhost:8080/NYVotingData'; // New York API endpoint
    } else if (selectedState === 'AR') {
      apiUrl = 'http://localhost:8080/ARVotingData'; // Arkansas API endpoint
    }

    // Use Axios to fetch data from the Spring Boot server
    axios.get(apiUrl)
      .then((response) => {
        console.log(`Fetched data for ${selectedState}:`, response.data); // Log the response for debugging

        // Convert the votes object into an array of party-vote pairs
        const filteredData = Object.entries(response.data).map(([party, count]) => ({
          Party: party, // Party name (DEM or REP)
          Votes: count, // Vote count for that party
        }));

        setFilteredVotesData(filteredData); // Update the state with filtered data
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log the error in case of failure
        setError(error.message); // Set the error state
        setLoading(false); // Stop loading
      });
  }, [selectedState]); // Re-run this effect whenever selectedState changes

  if (loading) {
    return <div>Loading data...</div>; // Display a loading message while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // Display the error message if fetching data fails
  }

  const data = {
    labels: filteredVotesData.map((item) => item.Party), // Extract party names for chart labels
    datasets: [
      {
        label: 'Votes', // Label for the dataset
        data: filteredVotesData.map((item) => item.Votes), // Extract vote counts for the chart
        backgroundColor: filteredVotesData.map((item) =>
          item.Party === 'REP' ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)' // Set red for REP and blue for DEM
        ),
      },
    ],
  };

  const options = {
    responsive: true, // Make the chart responsive
    plugins: {
      legend: {
        position: 'top', // Position the legend at the top
      },
      title: {
        display: true, // Display the title
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} Votes Distribution`, // Set the title based on the selected state
      },
    },
  };

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} Votes Distribution</h2> {/* Display the state-specific heading */}
      <p>
        Below is the vote distribution for political parties in {selectedState === 'NY' ? 'New York' : 'Arkansas'}.
      </p>
      <Pie data={data} options={options} /> {/* Render the Pie chart with the data and options */}
    </div>
  );
}

export default ElectionVotesContent; // Export the component for use in other parts of the app
