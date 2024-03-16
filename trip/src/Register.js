// Register.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.css';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');


  return (
    <div className='container'>
      <h2 className=''>Register</h2>
      <form action="" method="">
        <table className='resultTable'>
          <tbody>
            <tr>
              <th>
                <label htmlFor="firstName">First Name:</label>
              </th>
              <td>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  className='customSelect'
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="lastName">Last Name:</label>
              </th>
              <td>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  className='customSelect'
                  onChange={(e) => setLastName(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="email">Email:</label>
              </th>
              <td>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className='customSelect'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="password">Password:</label>
              </th>
              <td>
                <input
                  type="password"
                  id="password"
                  value={password}
                  className='customSelect'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="mobile">Mobile:</label>
              </th>
              <td>
                <input
                  type="text"
                  id="mobile"
                  value={mobile}
                  className='customSelect'
                  onChange={(e) => setMobile(e.target.value)}
                />
              </td>
            </tr>
            <tr>
                <td><button type="submit" name='submit' className='btn' >Register</button></td>
            </tr>
            <tr>
                <td> Already have an account? <Link to="/Signin">Login here</Link></td>
            </tr>
          </tbody>
        </table>
        
      </form>
      <p>
       
      </p>
    </div>
  );
}

export default Register;
