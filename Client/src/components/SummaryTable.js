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

    const formatNumber = (number) => {
        return number.toLocaleString('en-US');
    };

    const formatIncome = (income) => {
        const inThousands = income / 1000; // Convert to thousands
        return `$${Math.round(inThousands).toLocaleString('en-US')}K`;
    };

    if (loading || data === null) {
        return <div>Loading...</div>;
    }
    
    const formatPercentage = (value) => {
        if (data.totalPopulation === 0) return "0.00%";
        return ((value / data.totalPopulation) * 100).toFixed(2) + "%";
      };

      const tableHeaders = [
        "STATE",
        "District",
        "TOT POP",
        "WHITE",
        "BLACK",
        "ASIAN",
        "HISPANIC",
        "American Indian",
        "REPUBLICAN VOTES",
        "DEMOCRATIC VOTES",
        "Election Winner",
        "RURAL POP%",
        "SUBURBAN POP%",
        "URBAN POP%",
        "AVERAGE INCOME",
    ];

    const tableValues = [
        data.state.toUpperCase(),
        formatNumber(data.totalDistricts),
        formatNumber(data.totalPopulation),
        formatPercentage(data.demographics.white),
        formatPercentage(data.demographics.black),
        formatPercentage(data.demographics.asian),
        formatPercentage(data.demographics.hispanic),
        formatPercentage(data.demographics.americanIndian),
        formatNumber(data.totalRepublicanVotes),
        formatNumber(data.totalDemocraticVotes),
        data.electionWinner,
        formatPercentage(data.totalRuralPopulation),
        formatPercentage(data.totalSuburbanPopulation),
        formatPercentage(data.totalUrbanPopulation),
        formatIncome(data.averageIncome),
    ];

    return (
            <div
            className="summaryTable"
            // style={{
            //     display: "flex",
            //     justifyContent: "center",
            //     overflowX: "auto",
            //     paddingLeft: "2%",
            // }}
        >
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => (
                            <th
                                key={index}
                                style={{
                                    textAlign: "left",
                                    border: "1px solid black",
                                    padding: "5px"
                                }}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {tableValues.map((value, index) => (
                            <td
                                key={index}
                                style={{
                                    paddingRight: "5px",
                                    textAlign: "left",
                                    border: "1px solid black",
                                    padding: "5px"
                                }}
                            >
                                {value}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

export default SummaryTable;
