// src/components/MainContent.js
import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

// Register components for Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function MainContent({ selectedState }) {
  // State for active tab
  const [key, setKey] = useState('population');

  const data = {
    labels: ['poor', 'lower middle', 'middle', 'upper middle', 'rich'],
    datasets: [
      {
        label: 'population distribution',
        data: [50000, 100000, 150000, 80000, 60000],
        backgroundColor: 'rgba(75,192,192,0.6)',
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
        text: `${selectedState === 'NY' ? 'New York' : 'Arkansas'} population distribution`,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'income level',
        },
        type: 'category',
      },
      y: {
        title: {
          display: true,
          text: 'population',
        },
        beginAtZero: true,
      },
    },
  };

  // Function to render district drawing process information
  const getDistrictDrawingProcess = (state) => {
    switch (state) {
      case 'NY':
        return (
          <p>
            New York's district drawing process is handled by an independent commission. The commission is tasked with drawing
            fair and competitive districts based on demographic data and public input to ensure balanced representation.
          </p>
        );
      case 'AR':
        return (
          <p>
            In Arkansas, the district drawing process is managed by the state's Board of Apportionment. This board consists of
            the Governor, Secretary of State, and Attorney General, and they ensure that district boundaries are drawn in
            compliance with state and federal guidelines.
          </p>
        );
      default:
        return <p>Select a state to view its district drawing process.</p>;
    }
  };

  return (
    <div className="col-12 col-md-9 col-lg-9">
      <h2>{selectedState === 'NY' ? 'New York' : 'Arkansas'} Main Content</h2>
      
      {/* Add Tabs for different sections */}
      <Tabs
        id="main-content-tabs"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="population" title="Population Distribution">
          <p>
            Here is the population distribution and election result of {selectedState === 'NY' ? 'New York' : 'Arkansas'}.
          </p>
          <Bar data={data} options={options} />
        </Tab>
        <Tab eventKey="district" title="District Drawing Process">
          {getDistrictDrawingProcess(selectedState)}
        </Tab>
        <Tab eventKey="summary" title="Summary Data">
          <p>Summary data will be displayed here with dummy data.</p>
          {/* You can add your summary data or charts here */}
        </Tab>
      </Tabs>
    </div>
  );
}

export default MainContent;
