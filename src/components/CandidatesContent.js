import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
//import candidatesDataNY from '../data/NY_candidates_votes_2022.json'; // Import New York candidates votes data
//import candidatesDataAR from '../data/AR_candidates_votes_2022.json'; // Import Arkansas candidates votes data

import candidatesDataNY from '../data/NY_party_votes_distribution.json'; // Import New York party votes data
import candidatesDataAR from '../data/AR_party_votes_distribution.json'; // Import Arkansas party votes data

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function CandidatesContent({ selectedState }) {
  const [filteredVotesData, setFilteredVotesData] = useState([]);

  useEffect(() => {
    let votes = {};

    // Use appropriate data based on the selected state
    if (selectedState === 'NY') {
      votes = candidatesDataNY;
    } else if (selectedState === 'AR') {
      votes = candidatesDataAR;
    }

    // Convert votes to an array format
    const filteredData = Object.entries(votes).map(([candidate, count]) => ({
      Candidate: candidate,
      Votes: count,
    }));

    setFilteredVotesData(filteredData);
  }, [selectedState]);

  const data = {
    labels: filteredVotesData.map((item) => item.Candidate), // Extract candidate names
    datasets: [
      {
        label: 'Votes',
        data: filteredVotesData.map((item) => item.Votes), // Extract votes data
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 206, 86, 0.6)', // Yellow
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} Candidates Votes Distribution`,
      },
    },
  };

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} Candidates Votes Distribution</h2>
      <p>
        Below is the vote distribution for candidates in {selectedState === 'NY' ? 'New York' : 'Arkansas'}.
      </p>

      <Pie data={data} options={options} /> {/* Display the data as a pie chart */}
    </div>
  );
}

export default CandidatesContent;
