import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components needed for pie chart functionality
ChartJS.register(ArcElement, Tooltip, Legend);

function ElectionVotesContent({ selectedState }) {
  const [filteredVotesData, setFilteredVotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let apiUrl = '';

    // Correctly point to the Spring Boot backend running on localhost:8080
    if (selectedState === 'NY') {
      apiUrl = 'http://localhost:8080/NYVotingData';
    } else if (selectedState === 'AR') {
      apiUrl = 'http://localhost:8080/ARVotingData';
    }

    // Use Axios to fetch data from the Spring Boot server
    axios.get(apiUrl)
      .then((response) => {
        console.log(`Fetched data for ${selectedState}:`, response.data);

        // Convert the votes object into an array of party-vote pairs
        const filteredData = Object.entries(response.data).map(([party, count]) => ({
          Party: party,
          Votes: count,
        }));

        setFilteredVotesData(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, [selectedState]);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const data = {
    labels: filteredVotesData.map((item) => item.Party),
    datasets: [
      {
        label: 'Votes',
        data: filteredVotesData.map((item) => item.Votes),
        backgroundColor: filteredVotesData.map((item) => 
          item.Party === 'REP' ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)' // Set red for REP and blue for DEM
        ),
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
      <Pie data={data} options={options} />
    </div>
  );
}

export default ElectionVotesContent;
