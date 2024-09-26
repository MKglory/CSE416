import React from 'react'; // Removed useState from imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome.js';
import Main from './main.js';
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
                </Routes>
            </Router>
        </div>
    );
}

export default Root;
