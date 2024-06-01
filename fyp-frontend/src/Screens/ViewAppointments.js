import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/Dashboard.css'; // Adjust the import path as necessary
import Sidebar from './Sidebar'; // Adjust the import path as necessary

const ViewAllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [error, setError] = useState(null); // State to handle errors
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [selectedAppointment, setSelectedAppointment] = useState(null); // State to store the selected appointment details
  const [searchTerm, setSearchTerm] = useState(''); // State to store search term
  const [selectedDate, setSelectedDate] = useState(null); // State to store selected date

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [searchTerm, selectedDate, appointments]);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/appointment/getAllAppointments');
      if (response.data && Array.isArray(response.data.data.appointments)) {
        setAppointments(response.data.data.appointments);
        setFilteredAppointments(response.data.data.appointments);
      } else {
        throw new Error('Data format is incorrect');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Error fetching appointments');
    }
  };

  const fetchPatientNameById = async (patientId) => {
    try {
      const response = await axios.get(`http://localhost:3000/patient/getPatientById/${patientId}`);
      return response.data.data.patient.name;
    } catch (error) {
      console.error('Error fetching patient name:', error);
      return 'Unknown';
    }
  };

  const filterAppointments = async () => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.patient_id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDate) {
      filtered = filtered.filter(appointment =>
        new Date(appointment.date).toDateString() === selectedDate.toDateString()
      );
    }

    // Fetch patient names for filtered appointments
    for (let i = 0; i < filtered.length; i++) {
      filtered[i].patient_name = await fetchPatientNameById(filtered[i].patient_id);
    }

    setFilteredAppointments(filtered);
  };

  const handleOptionClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="dashboard-container">
            <Container className="my-4">
              <h2>All Appointments</h2>
              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <>
                  <Form className="mb-4">
                    <Form.Group controlId="searchTerm">
                      <Form.Label>Search by Patient ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Patient ID"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group controlId="datePicker">
                      <Form.Label>Filter by Date</Form.Label>
                      <DatePicker
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        className="form-control"
                        dateFormat="yyyy-MM-dd"
                      />
                    </Form.Group>
                  </Form>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Appointment ID</th>
                        <th>Patient Name</th>
                        <th>Patient ID</th>
                        <th>Day</th>
                        <th>Date</th>
                        <th>Completed</th>
                        <th>Option</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAppointments.map((appointment) => {
                        const appointmentDate = new Date(appointment.date);
                        const day = appointmentDate.toLocaleDateString('en-US', { weekday: 'long' });
                        const date = appointmentDate.toLocaleDateString('en-US');

                        return (
                          <tr key={appointment._id}>
                            <td>{appointment._id}</td>
                            <td>{appointment.patient_name}</td>
                            <td>{appointment.patient_id}</td>
                            <td>{day}</td>
                            <td>{date}</td>
                            <td>{appointment.completed ? 'Yes' : 'No'}</td>
                            <td>
                              <Button variant="primary" onClick={() => handleOptionClick(appointment)}>
                                Option
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </>
              )}
            </Container>

            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Appointment Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {selectedAppointment && (
                  <>
                    <p><strong>Appointment ID:</strong> {selectedAppointment._id}</p>
                    <p><strong>Patient Name:</strong> {selectedAppointment.patient_name}</p>
                    <p><strong>Patient ID:</strong> {selectedAppointment.patient_id}</p>
                    <p><strong>Radiologist ID:</strong> {selectedAppointment.radiologist_id}</p>
                    <p><strong>X-ray ID:</strong> {selectedAppointment.xray_id}</p>
                    <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString('en-US')}</p>
                    <p><strong>Time:</strong> {selectedAppointment.time}</p>
                    <p><strong>Completed:</strong> {selectedAppointment.completed ? 'Yes' : 'No'}</p>
                  </>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewAllAppointments;
