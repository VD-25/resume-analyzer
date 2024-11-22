import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import SignUp from './SignUp'
import LoginPage from './LoginPage';
import ResumeUpload from './ResumeUpload';

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation links */}
        <nav>
          <ul>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>

          </ul>
        </nav>

        {/* Define routes */}
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/upload" element={<ResumeUpload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;