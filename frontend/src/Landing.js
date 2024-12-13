import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-container">
      <div className="text-container">
        <h1 className="landing-title">Welcome to Your New AI Resume Analyzer</h1>
        <p className="landing-description">
          Our personalized AI resume analyzer provides tailored feedback based on specific job descriptions.
        </p>
        
        {/* Get Started Button */}
        <Link to="/signup" className="get-started-button">
          Get Started
        </Link>
        
        <p className="animation-attribution">
          <a href="https://www.lottiefiles.com/" title="Lottie Animation Files">
            Animation by LottieFiles
          </a>
        </p>
      </div>

      <div className="animation-container">
        <Player
          autoplay
          loop
          src="/resume1.json"
          className="lottie-animation"
        />
      </div>
    </div>
  );
};

export default Landing;
