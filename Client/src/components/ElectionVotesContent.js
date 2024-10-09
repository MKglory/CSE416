import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2'; // Import Pie instead of Bar
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import partyVotesDataNY from '../data/NY_party_votes_distribution.json'; // Import New York party votes data
import partyVotesDataAR from '../data/AR_party_votes_distribution.json'; // Import Arkansas party votes data

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function ElectionVotesContent({ selectedState }) {
  const [filteredVotesData, setFilteredVotesData] = useState([]);

  useEffect(() => {
    let votes = {};

    // Use appropriate data based on the selected state
    if (selectedState === 'NY') {
      votes = partyVotesDataNY;
    } else if (selectedState === 'AR') {
      votes = partyVotesDataAR;
    }

    // Convert votes to an array format
    const filteredData = Object.entries(votes).map(([party, count]) => ({
      Party: party,
      Votes: count,
    }));

    setFilteredVotesData(filteredData);
  }, [selectedState]);

  const data = {
    labels: filteredVotesData.map((item) => item.Party), // Extract party names
    datasets: [
      {
        label: 'Votes',
        data: filteredVotesData.map((item) => item.Votes), // Extract votes data
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 99, 132, 0.6)', // Red
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
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} Votes Distribution`,
      },
    },
  };

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} Votes Distribution</h2>
      <p>
        Below is the vote distribution for political parties in {selectedState === 'NY' ? 'New York' : 'Arkansas'}.
      </p>

      <Pie data={data} options={options} /> {/* Change from Bar to Pie */}
    </div>
  );
}

export default ElectionVotesContent;
