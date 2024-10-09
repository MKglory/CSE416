import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/styles.css'; // Import your custom styles

function Services() {
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
    <div className="vh-100 d-flex flex-column"> {/* Full height and flex to stretch content */}
      <Navbar />
      <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="row w-100">
          <div className="col-md-12">
            <div className={`content ${fadeContent ? 'fade-out' : 'fade-in'} ${!isVisible ? 'd-none' : ''}`}>
              <h1>Our Services</h1>
              <p>
                Our project offers a comprehensive analysis of demographic political preferences and district plans in U.S. states. 
                We use advanced computational tools, including Markov Chain Monte Carlo (MCMC) algorithms, to generate random district 
                plans and evaluate them for fairness and compliance with legal standards. Additionally, we provide insights into voting 
                patterns across different economic and racial demographics, helping to understand the impact of socioeconomic factors 
                on electoral outcomes.
              </p>
              <p>
                We also offer data visualization services, making it easier to interpret and explore the outcomes of district plans and 
                voting behavior analyses. Our platform integrates seamlessly with Java, JavaScript, and Python to deliver a smooth 
                user experience for data analysis and interpretation.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Services;
