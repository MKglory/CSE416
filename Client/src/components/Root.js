import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome.js';
import Main from './main.js';
import About from './About.js'; // Import the About component
import Services from './Services.js'; // Import the Services component
import Contact from './Contact.js'; // Import the Contact component
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
                    <Route path="/services" element={<Services />} /> {/* Add Services route */}
                    <Route path="/contact" element={<Contact />} /> {/* Add Contact route */}
                </Routes>
            </Router>
        </div>
    );
}

export default Root;
