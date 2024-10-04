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
    <div className="vh-100 d-flex flex-column">
      <Navbar />
      <div className="container-fluid flex-grow-1 d-flex align-items-center justify-content-center">
        <div className="row">
          <div className="col-md-12">
            <div className={`content text-center ${fadeContent ? 'fade-out' : 'fade-in'} ${!isVisible ? 'd-none' : ''}`}>
              <h1>About Our Project</h1>
              <p>
                Our platform is designed to analyze demographic political preferences and district plans across different U.S. states.
                By examining voting patterns, economic status, and racial demographics, we aim to provide insightful comparisons between high- and low-income states.
              </p>
              <p>
                The project leverages advanced algorithms such as Markov Chain Monte Carlo (MCMC) to generate random district plans and perform analyses of voter behavior.
                With a focus on understanding how various demographics influence political outcomes, the platform offers a comprehensive look at the intersection of economics, race, and politics.
              </p>
              <p>
                Through this tool, we hope to contribute to the broader conversation about gerrymandering and political representation in the United States.
                Our project integrates technologies like Java, JavaScript, Python, and data visualization tools to offer an interactive and in-depth analysis for both researchers and the public.
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
