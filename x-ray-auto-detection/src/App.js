import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoginPage from './LoginPage'; // Adjust the import path as necessary
import Dashboard from './Dashboard';
import Patients from './Patients';
import PatientDetails from './PatientDetail';
import GenerateReport from './GenerateReport';
import PatientHistory from './PatientHistory';
import CreatePatient from './CreatePatient';
import Homepage from './Homepage';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/patient-detail" element={<PatientDetails />} />
          <Route path="/patient-history" element={<PatientHistory />} />
          <Route path="/report" element={<GenerateReport />} />
          <Route path="/create-patient" element={<CreatePatient />} />
          {/* You can add more Route components here for other paths */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
