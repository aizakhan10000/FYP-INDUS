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
import AddAppointment from './Screens/AddAppointment';
import UploadImages from './Screens/BulkUpload';
import Setting from './Setting';
import Result from './Screens/Results';
import AddPatient from './Screens/AddPatient';
import ForgotPassword from './Screens/ForgotPassword';
import ViewAllAppointments from './Screens/ViewAppointments';

// import AddPatient from './AddPatient';
import XRay from './XRay';
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
          <Route path="/create-appointment" element={<AddAppointment />} />
          <Route path="/upload" element={<UploadImages />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/result" element={<Result />} />
          <Route path="/patient-add" element={<AddPatient />} />
          <Route path="/xray" element={<XRay />} />
          <Route path="/appointment" element={<ViewAllAppointments />} />
          {/* You can add more Route components here for other paths */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
