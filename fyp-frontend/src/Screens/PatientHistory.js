import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/Dashboard.css'; // Assuming you have a similar CSS file for consistent styling
import Sidebar from './Sidebar'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';

const PatientHistory = () => {
    const [searchDate, setSearchDate] = useState('');
    let navigate = useNavigate();

    // Dummy data for patient X-ray history
    const xrayResults = [
        { id: 1, date: '2023-03-10', result: 'Normal', doctor: 'Dr. Usama' },
        { id: 2, date: '2023-02-24', result: 'Pneumonia', doctor: 'Dr. Usama' },
        { id: 3, date: '2023-01-15', result: 'Pneumonia', doctor: 'Dr. Usama' },
        // More results...
    ].sort((a, b) => b.date.localeCompare(a.date)); // Sort by date, newest first

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchDate);
        // Implement search functionality here
    };

    const handleBack = () => {
        navigate("/patients"); // Replace with your actual back navigation route
    };

    // Function to handle row click
    const handleRowClick = (resultId) => {
        // alert(`Navigate to details for result: ${resultId}`);
        navigate("/report");
        // Implement navigation to detail view for the clicked x-ray result
        // navigate(`/xray-detail/${resultId}`);
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
                            <h1>Patient X-ray History</h1>
                        </div>
                        <Container className="pt-4 fade-in">
                            <Row>
                                <Col>
                                    <Form onSubmit={handleSearch} className="mb-3">
                                        <Form.Group controlId="searchDate">
                                            <Form.Control type="date" value={searchDate} onChange={e => setSearchDate(e.target.value)} />
                                        </Form.Group>
                                        <Button variant="primary" type="submit" className='button-danger'>Search</Button>
                                    </Form>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Result</th>
                                                <th>Doctor</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {xrayResults.map(({ id, date, result, doctor }) => (
                                                <tr key={id} onClick={() => handleRowClick(id)} style={{ cursor: 'pointer' }}>
                                                    <td>{date}</td>
                                                    <td>{result}</td>
                                                    <td>{doctor}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <Button variant="secondary" onClick={handleBack}>Back</Button>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientHistory;
