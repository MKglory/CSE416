import React from 'react';


function WelcomePage(props) {

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
        <div className="text-center">
            <h1 className="display-3 text-primary mb-4">Welcome to Our Platform!</h1>
            <p className="lead text-secondary mb-4">
            We're thrilled to have you here. Explore the features and feel free to reach out if you have any questions.
            </p>
            <a href="/main" className="btn btn-primary btn-lg">
            Explore Now
            </a>
        </div>
        </div>
    );
};

export default WelcomePage;
