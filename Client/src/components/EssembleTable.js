import React, { useState } from 'react';

const EnsemblePlan = () => {
  const [selectedState, setSelectedState] = useState('Alabama');
  const [ensembleData, setEnsembleData] = useState([
    { numPlans: 5000, populationThreshold: 2.0 },
  ]);

  return (
    <div>
      {selectedState && (
        <div>
          <table border="2" cellPadding="5" style={{ width: '100%'}}>
            <thead>
              <tr>
                <th>Number of District Plans</th>
                <th>Population Equality Threshold</th>
              </tr>
            </thead>
            <tbody>
              {ensembleData.length > 0 ? (
                ensembleData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.numPlans}</td>
                    <td>{item.populationThreshold}%</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center' }}>
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EnsemblePlan;
