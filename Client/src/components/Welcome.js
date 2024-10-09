import React, { useState } from 'react';

function WelcomePage() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleExploreClick = (event) => {
    event.preventDefault(); // Prevent the default anchor behavior
    setIsTransitioning(true);
    setTimeout(() => {
      window.location.href = '/main'; // Navigate to /main after transition
    }, 300); // Duration of the slide transition
  };

  return (
    <div className={`container-fluid vh-100 d-flex align-items-center justify-content-center bg-light ${isTransitioning ? 'slide-out' : ''}`}>
      <div className="text-center">
        <h1 className="display-3 text-primary mb-4">Welcome to Our Platform!</h1>
        <p className="lead text-secondary mb-4">
          We're thrilled to have you here. Explore the features and feel free to reach out if you have any questions.
        </p>
        <a href="/main" className="btn btn-primary btn-lg" onClick={handleExploreClick}>
          Explore Now
        </a>
      </div>
    </div>
  );
}

export default WelcomePage;
