import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import LoginPage from './Screens/LoginPage'; // Adjust the import path as necessary
import Dashboard from './Screens/Dashboard';
import Patients from './Screens/Patients';
import PatientDetails from './Screens/PatientDetail';
import GenerateReport from './Screens/GenerateReport';
import PatientHistory from './Screens/PatientHistory';
import CreatePatient from './Screens/CreatePatient';
// import Homepage from './Screens/Homepage';
import UploadImages from './Screens/BulkUpload';
import Setting from './Setting';
import Result from './Screens/Results';
import AddPatient from './Screens/AddPatient';
import ForgotPassword from './Screens/ForgotPassword';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/" element={<Homepage />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
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
          {/* You can add more Route components here for other paths */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
