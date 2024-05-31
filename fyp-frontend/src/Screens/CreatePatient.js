import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/Dashboard.css'; // Ensure the path is correct

const CreatePatient = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        PatientID: '',
        phoneNo: '',
        patientHistory: '',
        gender: '',
        radiologist: [] // Assuming this will be an array of ObjectId strings
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Implement your API call logic here, e.g.:
        // await fetch('localhost:3000/patient/createPatient', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
        navigate('/dashboard'); // Navigate after successful creation
    };

    return (
        <div className="container-fluid">
            <Row>
                <Col md={2} className="p-0">
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <Container className="pt-5">
                        <h2>Create Patient</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter patient name" name="name" value={formData.name} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" placeholder="City" name="city" value={formData.city} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Patient ID</Form.Label>
                                <Form.Control type="text" placeholder="Patient ID" name="PatientID" value={formData.PatientID} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control type="text" placeholder="Phone Number" name="phoneNo" value={formData.phoneNo} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Patient History</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Patient History" name="patientHistory" value={formData.patientHistory} onChange={handleChange} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select name="gender" value={formData.gender} onChange={handleChange}>
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Select>
                            </Form.Group>
                            {/* Additional form fields for radiologist can be added based on your UI/UX design */}
                            <Button variant="primary" type="submit">Create Patient</Button>
                        </Form>
                    </Container>
                </Col>
            </Row>
        </div>
    );
};

export default CreatePatient;
