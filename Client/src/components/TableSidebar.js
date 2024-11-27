import React from 'react';

function TableSidebar({ handlePlotChange, selectedContent }) {
  const handleSelect = (event) => {
    handlePlotChange(event.target.value);
  };

  return (
    <div className="sidebar">
      <ul className="list-group">
        <li className="list-group-item">
          <select
            className="form-select"
            onChange={handleSelect}
            value={selectedContent}
          >
            <option value="congressionalRepresentationTable">Congressional Representation Table</option>
            <option value="householdIncome">Household Income</option>
          </select>
        </li>
      </ul>
    </div>
  );
}

export default TableSidebar;
