import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar({ onStateChange, onTabChange }) {
  const navigate = useNavigate(); // Use React Router for navigation
  const location = useLocation(); // Get the current location
  const isMainPage = location.pathname === '/main'; // Check if we are on the main page

  const handleSelect = (event) => {
    onStateChange(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <button className="navbar-brand" type="button" style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.25rem' }}>
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
          <ul className="navbar-nav ms-auto">
            {/* Navigation List Items */}
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
              <a className="nav-link" href="#services">Services</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">Contact</a>
            </li>

            {/* Graph and Map Tabs */}
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => onTabChange('map')}>
                Map
              </button>
            </li>
            <li className="nav-item">
              <button className="nav-link btn btn-link" onClick={() => onTabChange('graph')}>
                Graph
              </button>
            </li>

            {/* Dropdown for State Selection */}
            {isMainPage && ( // Only render if on the main page
              <li className="nav-item dropdown">
                <select className="form-select" onChange={handleSelect} defaultValue="NY">
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
