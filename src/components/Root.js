import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome.js';
import Main from './main.js';
import About from './About.js'; // Import the About component
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import '../stylesheets/styles.css';

function Root() {
    return (
        <div>
            <Router>
                <Routes>
                    {/* Define routes with associated components */}
                    <Route path="/" element={<Welcome />} />  
                    <Route path="/main" element={<Main />} />
                    <Route path="/about" element={<About />} /> {/* Add About route */}
                </Routes>
            </Router>
        </div>
    );
}

export default Root;
