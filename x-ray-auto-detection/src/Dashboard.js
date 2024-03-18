import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Dashboard.css'; // Import the CSS file here
import Sidebar from './Screens/Sidebar'; // Assuming Sidebar.js is in the same directory

function Dashboard() {
  
  const stats = [
    { title: 'Registered Patient', value: 531, icon: '👤' },
    { title: 'Completed Appointments', value: 247, icon: '✔️' },
    { title: 'Referrals', value: 67, icon: '🔗' },
  ];

  const schedule = [
    { time: '8:00', name: 'Laura Jeans' },
    { time: '9:00', name: 'Will Smith' },
    { time: '10:00', name: 'Samira Khan' },
    
  ];

  const patients = [
    { id: '001', name: 'X-Ray Patient, Test_001', status: 'In Progress', doctor: 'Dr. Smith', images: 'Yes', date: 'Today' },
    { id: '002', name: 'X-Ray Patient, Test_002', status: 'Scheduled', doctor: 'Dr. Johnson', images: 'No', date: 'Today' },
    
  ];

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
              <h1>Radiologists Dashboard Screen</h1>
            </div>

            {/* Main Content */}
            <div className="container-fluid pt-4 fade-in">
              <div className="row">
                {/* Statistics Cards */}
                {stats.map((stat) => (
                  <div className="col-md-4 mb-3" key={stat.title}>
                    <div className="card text-center fade-in">
                      <div className="card-body">
                        <h5 className="card-title">{stat.title}</h5>
                        <p className="card-text">
                          {stat.icon} {stat.value}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Schedule */}
                <div className="col-12 mt-4 bg-primary-light-red">
                  <h2>Schedule</h2>
                  <ul className="list-group fade-in">
                    {schedule.map((appointment) => (
                      <li className="list-group-item" key={appointment.time}>
                        {appointment.time} - {appointment.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Patient List Table */}
                <div className="col-12 mt-4 bg-primary-light-red">
                  <h2>Patient List</h2>
                  <table className="table fade-in">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Options</th>
                        <th>Report Status</th>
                        <th>Doctor Name</th>
                        <th>Images Received</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient.id}>
                          <td>{patient.name}</td>
                          <td>{/* Options will go here */}</td>
                          <td>{patient.status}</td>
                          <td>{patient.doctor}</td>
                          <td>{patient.images}</td>
                          <td>{patient.date}</td>
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
}

export default Dashboard;
