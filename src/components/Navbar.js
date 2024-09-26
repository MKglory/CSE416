import React from 'react';

function Navbar({ onStateChange,onTabChange  }) {
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
          aria-label="切换导航"
        >
          <span className="navbar-toggler-icon">test</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
                        {/* Navigation List Items */}
                        <li className="nav-item">
              <a className="nav-link" href="#home">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">About</a>
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
            <li className="nav-item dropdown">
              <select className="form-select" onChange={handleSelect} defaultValue="NY">
                <option value="NY">New York (NY)</option>
                <option value="AR">Arkansas (Arkansas)</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
