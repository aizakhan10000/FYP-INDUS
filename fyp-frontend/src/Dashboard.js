import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Dashboard.css';
import Sidebar from './Screens/Sidebar';
import p1 from './patients/1.jpg';
import p2 from './patients/2.jpg';
import p3 from './patients/3.jpg';
import p4 from './patients/4.jpg';
import p5 from './patients/5.jpg';


function Dashboard() {
    const stats = [
        { title: 'Registered Patients', value: 2, icon: '👤' },
        { title: 'Completed Appointments', value: 15, icon: '✔️' },
        { title: 'Referrals', value: 1, icon: '🔗' },
    ];

    const reviews = [
        { name: 'Pneumonia', value: 200, fill: '#8884d8' },
        { name: 'Normal', value: 800, fill: '#83a6ed' },
    ];

    const appointments = [
        { name: 'ali', time: '08:00 AM', img: p2 },
        { name: 'aiza@', time: '09:00 AM', img: p1 },
        { name: 'aiza@', time: '10:00 AM', img: p1 },
        { name: 'ali', time: '11:00 AM', img: p2 },
        { name: 'aiza@', time: '12:00 PM', img: p1 },
    ];

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
                                    <h2>Reviews</h2>
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
                                    <h2>Today's Appointments</h2>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointments.map((appt, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <img src={appt.img} alt="profile" className="profile-pic"/>
                                                        {appt.name}
                                                    </td>
                                                    <td>{appt.time}</td>
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
