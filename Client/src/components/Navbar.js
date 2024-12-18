import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ onStateChange, selectedState, onReset }) {
  const navigate = useNavigate(); // Use React Router for navigation
  const location = useLocation(); // Get the current location
  const isMainPage = location.pathname === '/main'; // Check if we are on the main page

  const handleSelect = (event) => {
    onStateChange(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <button 
          className="navbar-brand" 
          type="button" 
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.25rem' }} 
          onClick={() => navigate('/')} // Navigate to the Welcome page
        >
          project
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">test</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            {/* Navigation Links */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/main')}>
                Home
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/about')}>
                About
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/services')}>
                Services
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => navigate('/contact')}>
                Contact
              </button>
            </li>
            {/* Reset button */}
            {isMainPage && selectedState && (
              <li className="nav-item">
                <button
                  className="btn btn-outline-light"
                  onClick={onReset}
                  style={{ marginRight: '10px' }} // Space between reset and dropdown
                >
                  Reset Page
                </button>
              </li>
            )}
            {/* Dropdown for State Selection */}
            {isMainPage && (
              <li className="nav-item dropdown">
                <select
                  className="form-select"
                  onChange={handleSelect}
                  value={selectedState} // Bind to selectedState
                >
                  <option value="">Select a state</option>
                  <option value="NY">New York (NY)</option>
                  <option value="AR">Arkansas (AR)</option>
                </select>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
