
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ handleLogout }) => {
  return (
    <div className="SideBar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/plantrip">Plan Trip</Link></li>
        <li><Link to="/canceltrip">Cancel Trip</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
  );
};

export default Sidebar;
