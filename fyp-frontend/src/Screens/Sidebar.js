import React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faUpload, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import profileImage from '../profile.jpg'; // Adjust the path as needed
import logo from '../logo.png'; // Logo import
import '../css-files/Sidebar.css'; // Ensure CSS is imported

function Sidebar() {
  const user = useSelector(state => state.user).user;

  return (
    <div className="sidebar p-3" style={{ fontSize: '1.2rem', gridColumn: 'span 2' }}>
      <div className="profile mb-3 d-flex align-items-center">
        <img src={profileImage} alt="Profile" className="rounded-circle mr-2" width="50" height="50" />
        <span className="profile-name">Hello {user ? user.name : 'Guest'}!</span>
      </div>
      <ul className="options">
        <li className="option mb-2 active">
          <Link to="/dashboard" className="nav-link">
            <FontAwesomeIcon icon={faHome} className="icon-spacing" /> HOME 
          </Link>
        </li>
        <li className="option mb-2">
          <Link to="/patients" className="nav-link">
            <FontAwesomeIcon icon={faList} className="icon-spacing" /> PATIENTS 
          </Link>
        </li>
        <li className="option mb-2">
          <Link to="/upload" className="nav-link">
            <FontAwesomeIcon icon={faUpload} className="icon-spacing" /> UPLOAD
          </Link>
        </li>
        <li className="option mb-2">
          <Link to="/appointment" className="nav-link">
            <FontAwesomeIcon icon={faCog} className="icon-spacing" /> SETTINGS
          </Link>
        </li>
        <li className="option mb-2">
          <Link to="/logout" className="nav-link">
            <FontAwesomeIcon icon={faSignOutAlt} className="icon-spacing" /> LOGOUT
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
