// import React, { useEffect, useState } from 'react';
// import { Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
// import nyPopulationData from '../data/NewYork/ny_population.json';
// import arPopulationData from '../data/Arkansas/ar_population.json';

// // Register components and the datalabels plugin
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

// function BarChart({ countyName, selectedState }) {
//   const [populationData, setPopulationData] = useState(null);

//   // Use the uploaded data directly
//   useEffect(() => {
//     console.log(selectedState);
//     if (countyName && nyPopulationData[countyName] && selectedState === 'NY') {
//       setPopulationData(nyPopulationData[countyName]);
//     }
//     else if (countyName && arPopulationData[countyName] && selectedState === 'AR'){
//       console.log('iam in ar')
//       setPopulationData(arPopulationData[countyName]);
//     }
//   }, [countyName, selectedState]);

//   // Only proceed if data is loaded
//   if (!populationData) {
//     return <p>Loading data...</p>;
//   }

//   // Extract race data for the chart
//   const raceLabels = [
//     "White alone",
//     "Black or African American alone",
//     "American Indian and Alaska Native alone",
//     "Asian alone",
//     "Native Hawaiian and Other Pacific Islander alone",
//     "Some Other Race alone"
//   ];
//   const racePopulations = raceLabels.map(race => {
//     const populationStr = populationData[race].replace(/,/g, '');
//     const populationNum = parseInt(populationStr);
//     return isNaN(populationNum) ? 0 : populationNum;
//   });

//   // Define the chart data
//   const data = {
//     labels: raceLabels,  // X-axis labels
//     datasets: [
//       {
//         label: 'Population by Race',
//         data: racePopulations,  // Y-axis data
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',  // Bar color
//       }
//     ]
//   };

//   // Define chart options
//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//       title: {
//         display: true,
//         text: `Population Distribution by Race in ${countyName}`,
//       },
//       tooltip: {
//         callbacks: {
//           label: (context) => `${context.dataset.label}: ${context.raw.toLocaleString()}`
//         }
//       },
//       datalabels: {
//         anchor: 'end',
//         align: 'top',
//         formatter: (value) => value.toLocaleString(),
//         color: '#444'
//       }
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: 'Race',
//         }
//       },
//       y: {
//         title: {
//           display: true,
//           text: 'Population',
//         },
//         beginAtZero: true,
//       }
//     }
//   };

//   return (
//     <div>
//       <Bar data={data} options={options} height={310}/>
//     </div>
//   );
// }
// export default BarChart;
