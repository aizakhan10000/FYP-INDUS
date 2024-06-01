import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/Dashboard.css';
import Sidebar from './Sidebar';
import axios from 'axios';

function Dashboard() {
  const [stats, setStats] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [lastFivePatients, setLastFivePatients] = useState([]);
  const [totalXraysAttended, setTotalXraysAttended] = useState(0);

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [lastFivePatients]);

  const fetchStats = async () => {
    try {
      const totalPatientsResponse = await axios.get('http://localhost:3000/patient/getTotalPatientsCount');
      const lastFivePatientsResponse = await axios.get('http://localhost:3000/patient/getLastFivePatients');
      const totalXray = await axios.get('http://localhost:3000/xray/countTotalXrays');
      const totalAppointmentsResponse = await axios.get('http://localhost:3000/appointment/getTotalAppointmentsCount');
      const xrayResultsResponse = await axios.get('http://localhost:3000/xray/countXrayResults');

      setStats([
        { title: 'Registered Patients', value: totalPatientsResponse.data.data.count, icon: '👤' },
        { title: 'X-Rays Scanned', value: totalXray.data.count, icon: '✔️' },
        { title: 'Total Appointments', value: totalAppointmentsResponse.data.count, icon: '📅' },
      ]);

      setReviews([
        { name: 'Pneumonia', value: 75, fill: '#8884d8' },
        { name: 'Normal', value: 100, fill: '#83a6ed' },
      ]);

      setLastFivePatients(lastFivePatientsResponse.data.data.patients);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const formattedAppointments = lastFivePatients.map(patient => ({
        name: patient.name,
      }));

      setAppointments(formattedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="dashboard-container">
            <div className="bg-primary-soft-blue text-dark text-center py-3 fade-in">
              <h1>Radiologist Dashboard</h1>
            </div>
            <div className="container-fluid pt-4 fade-in">
              <div className="row">
                {stats.map((stat, index) => (
                  <div className="col-md-4 mb-3" key={index}>
                    <div className="card text-center">
                      <div className="card-body">
                        <h5 className="card-title">{stat.title}</h5>
                        <p className="card-text">{stat.icon} {stat.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-md-6">
                  <h2>Classification</h2>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie dataKey="value" data={reviews} cx="50%" cy="50%" outerRadius={100} label>
                        {reviews.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="col-md-6">
                  <h2>Last 5 Patients</h2>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appt, index) => (
                        <tr key={index}>
                          <td>{appt.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-md-12">
                  <h2>Calendar</h2>
                  <Calendar />
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
    