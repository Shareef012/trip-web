import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Home from './Home';
import PlanTrip from './PlanTrip';
import CancelTrip from './CancelTrip';
import About from './About';
import Profile from './Profile';
import Logo from './Logo';
import Signin from './Signin';
import Payment from './Payment';
import './App.css'; // Import your CSS file
import Register from './Register';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const handleLogin =() =>{
  setIsLoggedIn(true);
}
  // Function to handle login
  useEffect(() => {
    // Check if the user is logged in (e.g., by checking cookies or session)
    // Update isLoggedIn state accordingly
    const checkLoggedInStatus = async () => {
      try {
        // Make an API request to check if the user is logged in
        const response = await fetch('/api/checkLoggedInStatus');
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch (error) {
        console.error('Failed to check login status:', error);
      }
    };

    checkLoggedInStatus();
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Clear any authentication tokens or cookies
  };

  return (
    <Router>
      <div className="app">
        <Logo />
        <div className="container">
          <Sidebar handleLogout={handleLogout} />
          <div className="content">
            <Routes>
              <Route path="/" element={<Navigate to="/signin" />} />
              <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/signin" />} />
              <Route path="/plantrip" element={isLoggedIn ? <PlanTrip /> : <Navigate to="/signin" />} />
              <Route path="/canceltrip" element={isLoggedIn ? <CancelTrip /> : <Navigate to="/signin" />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/signin" />} />
              <Route path="/signin" element={<Signin onLogin={handleLogin} />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/redirect-url/:merchantTransactionId"
                element={<Payment isLoggedIn={isLoggedIn} />}
              />
            </Routes>
            {isLoggedIn && (
              <button onClick={handleLogout}>Logout</button>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
