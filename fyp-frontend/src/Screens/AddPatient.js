import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddPatient = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    city: '',
    patientId:'',
    phoneNo: '',
    patientHistory: '',
    gender: ''
  });

  const addPatient = async () =>{
      try{
        const response = await axios.post(`http://localhost:3000/patient/createPatient`
        ,{
          name: formData.name,
          city : formData.city,
          PatientID: formData.patientId,
          patientHistory: formData.patientHistory,
          phoneNo: formData.phoneNo,
          gender: formData.gender
        })
        // if (!response.ok) {
        //   throw new Error('Network response was not ok');
        // }
        // const data = await response.data();
        console.log(response)
        // setFormData(data.data.patient);
      }
      catch(error){
        console.error('Error posting patient details:', error);
      }
    };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPatient();
    // TODO: Add logic to submit the form data to the backend (e.g., via API)
    // console.log(formData);
    // Redirect to dashboard or patient list page after successful submission
    navigate('/patients');
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
                    <Form.Group controlId="patientID">
                      <Form.Label>Patient ID</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter patient ID"
                        name="patientId"
                        value={formData.patientId}
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
                <div className="text-right">
                  <Button variant="primary" type="submit" style={{ backgroundColor: '#e8232a', marginLeft: '10px', width:'100px' }}>
                    Add
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
