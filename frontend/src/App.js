import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './components/SignUp';
import LoginPage from './components/LoginPage';
import ResumeUpload from './components/ResumeUpload';
import Dashboard from './components/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Track login status
  const [isUploaded, setIsUploaded] = useState(true);

  // This function will be passed as a prop to Login and will be called on success
  const handleLogin = (status) => {
    setIsLoggedIn(status); // Set to true when the login is successful
  };

  const handleUpload = (status) => {
    setIsUploaded(status);
  };

  const handleLogout = () => {
    console.log("User logged out.");
    if (isLoggedIn) {
      alert("Logged out successfully!");
    } else {
      alert("Already logged out!");
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
              <Link to="/dashboard" className="navbar-link">Dashboard</Link>
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

        {/* Define routes */}
        <Routes>
          <Route path="/logout" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />
          <Route path="/upload" element={isLoggedIn ? <ResumeUpload onUploadSuccess={handleUpload} /> : <p>Please Login to view upload page</p>} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <p>Please Login to view dashboard</p>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
