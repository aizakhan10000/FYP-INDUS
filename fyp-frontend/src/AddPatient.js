import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Screens/Sidebar'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const AddPatient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phoneNo: '',
    patientHistory: '',
    gender: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add logic to submit the form data to the backend (e.g., via API)
    console.log(formData);
    // Redirect to dashboard or patient list page after successful submission
    navigate('/dashboard');
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
              <h2 className="mb-4">Add New Patient</h2>
              <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col>
                    <Form.Group controlId="name">
                      <Form.Label>Patient Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter patient name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId="city">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="phoneNo" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    name="phoneNo"
                    value={formData.phoneNo}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="patientHistory" className="mb-3">
                  <Form.Label>Patient History</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter patient history"
                    name="patientHistory"
                    value={formData.patientHistory}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="gender" className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control
                    as="select"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>
                <div className="text-center">
                  <Button variant="primary" type="submit">
                    Add Patient
                  </Button>
                </div>
              </Form>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
