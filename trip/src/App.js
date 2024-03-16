// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
  return (
    <Router>
      <div className="app">
        <Logo />
        <div className="container">
          <Sidebar />
          <div className="content">
            <Routes>

              <Route path="/" element={<Home />} />
              <Route path="/plantrip" element={<PlanTrip />} />
              <Route path="/canceltrip" element={<CancelTrip />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/Payment" element={<Payment />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
