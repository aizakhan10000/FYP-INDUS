import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faList, faUpload, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import profileImage from '../profile.jpg'; // Adjust the path as needed
import '../css-files/Sidebar.css'; // Adjust the path as needed

function Sidebar() {
  return (
    <div className="sidebar p-3" style={{ fontSize: '1.2rem', gridColumn: 'span 2' }}>
      <div className="profile mb-3 d-flex align-items-center">
        <img src={profileImage} alt="Profile" className="rounded-circle mr-2" width="50" height="50" />
        <span className="profile-name">John Doe</span>
      </div>
      <ul className="options">
        <li className="option mb-2">
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
          <Link to="/setting" className="nav-link">
            <FontAwesomeIcon icon={faCog} /> SETTING
          </Link>
        </li>
        {/* Logout option */}
        <li className="option mb-2">
          <Link to="/login" className="nav-link" style={{ color: 'red' }}> {/* Adjust the link as necessary */}
            <FontAwesomeIcon icon={faSignOutAlt} style={{ color: 'red' }} /> LOGOUT
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
