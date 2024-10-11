import axios from 'axios';
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
  const [filteredVotesData, setFilteredVotesData] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let apiUrl = `http://localhost:8080/${selectedState}VotingData`;
    setLoading(true);
    axios.get(apiUrl) // promise
      .then((response) => {
        const filteredData = Object.entries(response.data).map(([party, count]) => ({
          Party: party,
          Votes: count,
        }));
        setFilteredVotesData(filteredData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error); 
        setLoading(false);
      });
  }, [selectedState]);

  if (loading) {
    return <div>Loading data...</div>;
  }
  const data = {
    labels: filteredVotesData.map((item) => item.Party),
    datasets: [
      {
        label: 'Votes',
        data: filteredVotesData.map((item) => item.Votes),
        backgroundColor: filteredVotesData.map((item) =>
          item.Party === 'REP' ? 'rgba(255, 99, 132, 0.6)' : 'rgba(54, 162, 235, 0.6)'
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
      <Pie data={data} options={options} /> 
    </div>
  );
}

export default ElectionVotesContent; 