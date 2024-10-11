import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ElectionVotesContent({ selectedState }) {
  console.log('ElectionVotesContent component is rendering');

  const [filteredVotesData, setFilteredVotesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Component rendered, selectedState:', selectedState); // Log initial render and state selection
    setLoading(true);

    let apiUrl = '';
    // Determine API URL based on the selected state
    if (selectedState === 'NY') {
      apiUrl = '/NYVotingData';
      console.log('Fetching data from NY endpoint:', apiUrl);
    } else if (selectedState === 'AR') {
      apiUrl = '/ARVotingData';
      console.log('Fetching data from AR endpoint:', apiUrl);
    } else {
      console.error('Invalid selectedState value:', selectedState); // If an unexpected state is passed
    }

    console.log('Fetching data from API:', apiUrl);

    // Fetch data from the server
    fetch(apiUrl)
      .then((response) => {
        console.log('Received response:', response); // Log the entire response object

        if (!response.ok) {
          console.error('Response not OK, status:', response.statusText);
          throw new Error(`Error fetching data: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched data (raw JSON):', data); // Log the data received

        // Convert the votes object into an array of party-vote pairs
        const filteredData = Object.entries(data).map(([party, count]) => ({
          Party: party,
          Votes: count,
        }));

        console.log('Filtered data (for chart):', filteredData); // Log the filtered data

        setFilteredVotesData(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error during fetch:', err); // Log any errors that occur during fetch
        setError(err.message);
        setLoading(false);
      });
  }, [selectedState]);

  if (loading) {
    console.log('Loading state active...'); // Log loading state
    return <div>Loading data...</div>;
  }

  if (error) {
    console.error('Error occurred:', error); // Log error state
    return (
      <div className="error-message">
        <h2>Data Retrieval Failed</h2>
        <p>We are sorry, but we were unable to retrieve the voting data for {selectedState === 'NY' ? 'New York' : 'Arkansas'} at this time.</p>
      </div>
    );
  }

  const data = {
    labels: filteredVotesData.map((item) => item.Party),
    datasets: [
      {
        label: 'Votes',
        data: filteredVotesData.map((item) => item.Votes),
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  console.log('Rendering chart with data:', data); // Log final data being used for the chart

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
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} Votes Distribution</h2>
      <p>Below is the vote distribution for political parties in {selectedState === 'NY' ? 'New York' : 'Arkansas'}.</p>
      <Pie data={data} options={options} />
    </div>
  );
}

export default ElectionVotesContent; // Export the component for use in other parts of the app
