import React from 'react';

function ElectionVotesContent({ selectedCounty, selectedPrecinct }) {
  return (
    <div>
      <h2>Election Votes Content</h2>
      <p>
        Displaying election vote data for {selectedPrecinct}, {selectedCounty}.
      </p>
      {/* You can add more dummy data or functionality here */}
    </div>
  );
}

export default ElectionVotesContent;
