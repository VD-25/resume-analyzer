import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate } from 'react-router-dom';
import './styles/App.css';
import SignUp from './components/auth/SignUp';
import LoginPage from './components/auth/LoginPage';
import ResumeUpload from './components/resume/ResumeUpload';
import Dashboard from './components/dashboard/Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { isTokenValid, clearToken } from './utils/token'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token validity on app load
  useEffect(() => {
    const loggedIn = isTokenValid(); 
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status); 
  };

  const handleLogout = () => {
    if (isLoggedIn) {
      clearToken();
      setIsLoggedIn(false);
      alert("Logged out successfully!");
    } else {
      alert("Already logged out!");
    }
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
              <Link to="/" className="navbar-link" onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLogin} />} />
          <Route path="/upload" element={isLoggedIn ? <ResumeUpload /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
