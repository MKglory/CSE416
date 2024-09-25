import React from 'react';

function Navbar({ onStateChange }) {
  const handleSelect = (event) => {
    onStateChange(event.target.value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">project</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" 
          aria-controls="navbarNav" aria-expanded="false" aria-label="切换导航">
          <span className="navbar-toggler-icon">test</span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
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
