import React, { useState, useEffect } from 'react'; 
import Navbar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/styles.css'; // Import your custom styles

function About() {
  const [fadeContent, setFadeContent] = useState(false); // State for managing fade effect for content
  const [isVisible, setIsVisible] = useState(false); // State for controlling visibility of content

  useEffect(() => {
    setFadeContent(true); // Start fade-out effect when component mounts
    const timer = setTimeout(() => {
      setIsVisible(true); // Make the content visible after fade-out
      setFadeContent(false); // Remove fade effect
    }, 500); // Wait for fade-out duration

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []); // Run this effect only once when component mounts

  return (
    <div>
      <Navbar />
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-12">
            <div className={`content ${fadeContent ? 'fade-out' : 'fade-in'} ${!isVisible ? 'd-none' : ''}`}> {/* Added fade classes for content */}
              <h1>About Us</h1>
              <p>
                This is the About page of the platform. Here, you can find information about our mission, values, and team.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
