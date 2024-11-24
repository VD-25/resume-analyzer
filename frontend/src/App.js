import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './SignUp'
import LoginPage from './LoginPage';
import ResumeUpload from './ResumeUpload';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status
  // This function will be passed as a prop to Login and will be called on success
  const handleLogin = (status) => {
    setIsLoggedIn(status); // Set to true when the login is successful
  };

  const handleLogout = () => {
    console.log("User logged out.");
    if (isLoggedIn){
      alert("logged out successfully!");
        // Set the state to false when the link is clicked
    }
    else{
      alert("already logged out!");
    }
    setIsLoggedIn(false);
    
  };

  
  return (
    <Router>
      <div>
        {/* Navigation links */}
        <nav className="navbar">
        <ul className="navbar-list">
          <li>
              <Link to="/upload" className="navbar-link">Upload</Link>
            </li>
            <li>
              <Link to="/signup" className="navbar-link">Sign Up</Link>
            </li>
            <li>
              <Link to="/login" className="navbar-link">Login</Link>
            </li>
            <li>
              <Link to="/logout" className="navbar-link" onClick={handleLogout}>Logout</Link>
            </li>
        </ul>
        </nav>
        <nav>
          <ul>
          

          </ul>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/logout" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin}/>} />
          <Route path="/upload" element={isLoggedIn ? <ResumeUpload /> : <p>Please Login to view upload page</p>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;