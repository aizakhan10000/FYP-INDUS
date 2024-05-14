import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Dashboard.css'; // Adjust if necessary
import Sidebar from './Screens/Sidebar'; // Ensure the correct path
import { useNavigate } from 'react-router-dom';

const Patient = () => {
  let navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/patient/getAllPatients') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        // Assuming 'data' is the object containing the 'patients' array
        setPatients(data.data.patients); // Adjust based on your actual response structure
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Fetching error:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  // Example function for handling row click
  const handleRowClick = (patientId) => {
    // Navigate to patient detail with patientId
    navigate(`/patient-detail/${patientId}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container-fluid">
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
              <h1>Patient Management</h1>
            </div>

            {/* Main Content */}
            <div className="container-fluid pt-4 fade-in">
              <div className="row">
                {/* Patient List Table */}
                <div className="col-12 mt-4">
                  <h2>Patient List</h2>
                  <table className="table fade-in">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>City</th>
                        <th>Patient ID</th>
                        <th>Phone No</th>
                        <th>Patient History</th>
                        <th>Gender</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient._id} onClick={() => handleRowClick(patient._id)} style={{ cursor: 'pointer' }}>
                          <td>{patient.name}</td>
                          <td>{patient.city}</td>
                          <td>{patient.PatientID}</td>
                          <td>{patient.phoneNo}</td>
                          <td>{patient.patientHistory}</td>
                          <td>{patient.gender}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;
