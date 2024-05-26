import React , { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faUpload, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import profileImage from '../profile.jpg'; // Adjust the path as needed
import logo from '../logo.png'; // Logo import
// import '../css-files/Sidebar.css'; // Adjust the path as needed\
import '../css-files/Sidebar.css'

function Sidebar() {
  // const [userName, setUserName] = useState('');
  const user = useSelector(state => state.user).user;
  console.log("SIDEBAR: ", user)
  
  return (
    <div className="sidebar p-3" style={{ fontSize: '1.2rem', gridColumn: 'span 2' }}>
      <div className="profile mb-3 d-flex align-items-center">
        <img src={profileImage} alt="Profile" className="rounded-circle mr-2" width="50" height="50" />
        <span className="profile-name">Hello {user ? user.name : 'Guest'}!</span>
      </div>
      {/* Menu items */}
      <ul className="options">
        <li className="option mb-2 active"> {/* Assuming HOME is active */}
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faHome} /> HOME
          </Link>
        </li>
        <li className="option mb-2">
          <Link to="/patients" className="nav-link">
            <FontAwesomeIcon icon={faList} /> PATIENTS
          </Link>
        </li>
        <li className="option mb-2">
          <Link to="/upload" className="nav-link">
            <FontAwesomeIcon icon={faUpload} /> UPLOAD
          </Link>
        </li>
        <li className="option mb-2">
          <Link to="/settings" className="nav-link">
            <FontAwesomeIcon icon={faCog} /> SETTING
          </Link>
        </li>
      </ul>
      {/* User profile at the bottom */}
      <div className="profile d-flex align-items-center">
        {/* <img src={profileImage} alt="Profile" className="rounded-circle mr-2" width="50" height="50" /> */}
        {/* <div style={{ color: 'white' }}>
          <div>Tim Cook</div>
        </div> */}
      </div>
    </div>
  );
}

export default Sidebar;
