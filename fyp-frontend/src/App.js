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
import UploadImages from './BulkUpload';
import Setting from './Setting';
import Result from './Results';
import AddPatient from './AddPatient';
import XRay from './XRay';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patients" element={<Patients />} />
          {/* <Route path="/patient-detail" element={<PatientDetails />} /> */}
          <Route path="/patient-detail/:id" element={<PatientDetails />} />
          <Route path="/patient-history" element={<PatientHistory />} />
          <Route path="/report" element={<GenerateReport />} />
          <Route path="/create-patient" element={<CreatePatient />} />
          <Route path="/upload" element={<UploadImages />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/result" element={<Result />} />
          <Route path="/patient-add" element={<AddPatient />} />
          <Route path="/xray" element={<XRay />} />
          {/* You can add more Route components here for other paths */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
