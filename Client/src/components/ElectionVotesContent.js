import React, { useEffect, useState } from 'react'; // Import React and necessary hooks
import { Pie } from 'react-chartjs-2'; // Import the Pie component from react-chartjs-2
import {
  Chart as ChartJS,    // Import the main Chart.js module to create and configure charts
  ArcElement,           // Import the ArcElement used for rendering arcs in Pie and Doughnut charts
  Tooltip,              // Import Tooltip to display information when hovering over chart elements
  Legend,               // Import Legend to show a guide that maps colors or symbols to data categories
} from 'chart.js';       // Import necessary Chart.js components for chart functionality


import partyVotesDataNY from '../data/NY_party_votes_distribution.json'; // Import vote data for New York
import partyVotesDataAR from '../data/AR_party_votes_distribution.json'; // Import vote data for Arkansas

// Register Chart.js components needed for pie chart functionality
ChartJS.register(ArcElement, Tooltip, Legend);

function ElectionVotesContent({ selectedState }) { // Declare the functional component that receives the selectedState prop
  const [filteredVotesData, setFilteredVotesData] = useState([]); // Initialize state to hold filtered votes data

  useEffect(() => { // useEffect runs whenever selectedState changes
    let votes = {}; // Initialize votes variable

    // Use the appropriate vote data based on the selected state
    if (selectedState === 'NY') {
      votes = partyVotesDataNY; // Set to New York vote data
    } else if (selectedState === 'AR') {
      votes = partyVotesDataAR; // Set to Arkansas vote data
    }

    // Convert the votes object into an array of party-vote pairs
    const filteredData = Object.entries(votes).map(([party, count]) => ({
      Party: party, // Set the party name
      Votes: count, // Set the vote count
    }));

    setFilteredVotesData(filteredData); // Update the state with the filtered data
  }, [selectedState]); // Effect depends on selectedState, so it will run when it changes

  const data = {
    labels: filteredVotesData.map((item) => item.Party), // Extract party names as labels for the chart
    datasets: [
      {
        label: 'Votes', // Dataset label
        data: filteredVotesData.map((item) => item.Votes), // Extract the votes count
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Set blue color for one party
          'rgba(255, 99, 132, 0.6)', // Set red color for another party
        ],
      },
    ],
  }; // Data structure used by the Pie chart

  const options = {
    responsive: true, // Make the chart responsive to screen size
    plugins: {
      legend: {
        position: 'top', // Set legend position to the top
      },
      title: {
        display: true, // Display the title
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} Votes Distribution`, // Set the title dynamically based on state
      },
    },
  };

  return (
    <div className="col-12 col-md-9 col-lg-9"> {/* Create a div container with Bootstrap classes */}
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} Votes Distribution</h2> {/* Display a dynamic heading based on the selected state */}
      <p>
        Below is the vote distribution for political parties in {selectedState === 'NY' ? 'New York' : 'Arkansas'}.
      </p>

      <Pie data={data} options={options} /> {/* Render the Pie chart with the defined data and options */}
    </div>
  );
}

export default ElectionVotesContent; // Export the component for use in other parts of the app
