import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SummaryTable({ selectedState }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        setLoading(true);
        summaryDataRequest();
    }, [selectedState]);

    const summaryDataRequest = async () => {
        const response = await axios.get(`http://localhost:8080/${selectedState}/Summary`);
        setData(response.data);
        console.log(response.data);
        setLoading(false);
    };

    // Helper function to format numbers with commas
    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    // Helper function to format income with two decimal places
    const formatIncome = (income) => {
        return `$${income.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    if (loading || data === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="summaryTable">
            <table 
            style={{ 
                    width: "98%", 
                    border: "1px solid black", 
                    borderCollapse: "collapse" 
                }}
            >
                <thead>
                    <tr>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>STATE</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>District</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>TOT POP</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>WHITE</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>BLACK</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>ASIAN</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>HISPANIC</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>American Indian</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>REPUBLICAN</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>DEMOCRATIC</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>Election Winner</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>RURAL POP</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>SUBURBAN POP</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>URBAN POP</th>
                        <th style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>AVERAGE INCOME</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{data.state.toUpperCase()}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.totalDistricts)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.totalPopulation)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.demographics.white)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.demographics.black)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.demographics.asian)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.demographics.hispanic)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.demographics.americanIndian)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.totalRepublicanVotes)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.totalDemocraticVotes)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{data.electionWinner}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.totalRuralPopulation)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.totalSuburbanPopulation)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatNumber(data.totalUrbanPopulation)}</td>
                        <td style={{ padding: "8px", textAlign: "left", border: "1px solid black" }}>{formatIncome(data.averageIncome)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default SummaryTable;
