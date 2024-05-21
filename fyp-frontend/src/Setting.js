import React, { useState } from 'react';
import Sidebar from './Screens/Sidebar';
import './css-files/Dashboard.css';

function Setting() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [language, setLanguage] = useState('en'); // Default language: English

  const handleModeToggle = () => {
    setIsDarkMode(!isDarkMode);
    // You can add logic here to persist the mode preference (e.g., to localStorage)
  };

  const handleNotificationToggle = () => {
    setNotificationEnabled(!notificationEnabled);
    // You can add logic here to handle notification preferences
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // You can add logic here to handle language selection
  };

  return (
    <div className={`container-fluid ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-md-10">
          <div className="dashboard-container">
            {/* Header */}
            <div className="bg-primary-soft-blue text-dark text-center py-3 fade-in">
              <h1>Settings</h1>
            </div>

            {/* Settings Content */}
            <div className="container-fluid pt-4 fade-in">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="card">
                    <div className="card-body">
                      {/* Dark Mode Toggle */}
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="darkModeToggle"
                          checked={isDarkMode}
                          onChange={handleModeToggle}
                        />
                        <label className="form-check-label" htmlFor="darkModeToggle">
                          Dark Mode
                        </label>
                      </div>

                      {/* Notification Toggle */}
                      <div className="form-check mb-3">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="notificationToggle"
                          checked={notificationEnabled}
                          onChange={handleNotificationToggle}
                        />
                        <label className="form-check-label" htmlFor="notificationToggle">
                          Enable Notifications
                        </label>
                      </div>

                      {/* Language Selection */}
                      <div className="form-group mb-3">
                        <label htmlFor="languageSelect">Language:</label>
                        <select
                          className="form-control"
                          id="languageSelect"
                          value={language}
                          onChange={handleLanguageChange}
                        >
                          <option value="en">English</option>
                          <option value="fr">Urdu</option>
                          {/* Add more language options as needed */}
                        </select>
                      </div>

                      {/* Additional Settings */}
                      {/* Add more settings options based on your application requirements */}
                      {/* For example: User profile settings, account preferences, etc. */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
