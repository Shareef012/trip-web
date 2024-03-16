// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="SideBar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/plantrip">Plan A Trip</Link>
        </li>
        <li>
          <Link to="/canceltrip">Cancel A Trip</Link>
        </li>
        <li>
          <Link to="/about">About us</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/Signin">Signin</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
