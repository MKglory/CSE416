import React, { useState, useEffect } from "react";
import axios from "axios";

const EnsemblePlan = ({ selectedState }) => {
  const [loading, setLoading] = useState(true);
  const [ensembleData, setEnsembleData] = useState(null);

  useEffect(() => {
    if (!selectedState) return;
    setLoading(true);
    axios
      .get(`http://localhost:8080/${selectedState}/ensemble/summary`)
      .then((response) => {
        setEnsembleData(response.data.ensembleSummary);
        setLoading(false);
        console.log(response.data.ensembleSummary[0]);
      })
      .catch((error) => {
        console.error("Error fetching district data:", error);
        setLoading(false);
      });
  }, [selectedState]);
  const formatNumber = (number) => {
    if (number == 0 ) return 0;
    number = Math.round(number / 1000) * 1000;
    return number.toLocaleString('en-US');
  };

  if (loading || !ensembleData) return <div> No data avaiable</div>
  return (
    <div>
      {selectedState && (
        <div>
          <table border="2" cellPadding="5" style={{ width: '100%'}}>
            <thead>
              <tr>
                <th>District Plans</th>
                <th>Ideal Population</th>
                <th>Population Threshold</th>
              </tr>
            </thead>
            <tbody>
              {ensembleData.length > 0 ? (
                ensembleData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.totalPlans}</td>
                    <td>{formatNumber(item.idealPopulation)}</td>
                    <td>{item.tolerant * 100}%</td>
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
