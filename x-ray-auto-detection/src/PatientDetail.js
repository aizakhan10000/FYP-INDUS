import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Dashboard.css'; // Adjust the path as necessary
import Sidebar from './Screens/Sidebar'; // Adjust as necessary
import { useNavigate } from 'react-router-dom';

const PatientDetails = () => {
  let navigate = useNavigate();
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [reportResult, setReportResult] = useState(''); // State to store report result
  const [imageFile, setImageFile] = useState(null); // State to store the selected file
  
  const patient = {
    firstName: 'Laura',
    lastName: 'Jeans',
    gender: 'Female',
    age: 28,
    image: 'https://via.placeholder.com/150', // Placeholder image
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      setShowGenerateReport(true); // Show "Generate Report" button after image is selected
    } else {
      setSelectedImage(null);
      setShowGenerateReport(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const generateReport = () => {
    navigate("/report")
    // Implement report generation logic here
  };

  const viewPatientHistory = () => {
    navigate('/patient-history');
  };

  const followUpRequests = () => {
    console.log('Follow-up requests logic goes here.');
    // Implement follow-up requests logic here
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
              <h1>Patient Details</h1>
            </div>
            <Container className="pt-4 fade-in">
              <Row>
                <Col>
                  <Card>
                    <Card.Body>
                      <Row>
                        <Col xs={12} md={6} className="mb-3">
                          <div style={{ minHeight: '200px', minWidth: '200px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {selectedImage ? (
                              <Image src={selectedImage} alt="X-ray" style={{ maxHeight: '200px', maxWidth: '200px' }} />
                            ) : (
                              <p>No Image Uploaded</p>
                            )}
                          </div>
                          <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                          {showGenerateReport && <Button onClick={generateReport} variant="primary" className="mt-2">Generate Report</Button>}
                        </Col>
                        <Col xs={12} md={6}>
                          <Card.Title className="mt-3">{`${patient.firstName} ${patient.lastName}`}</Card.Title>
                          <Card.Text>Gender: {patient.gender}</Card.Text>
                          <Card.Text>Age: {patient.age}</Card.Text>
                          <Form>
                            <Form.Group>
                              <Form.Label>Notes</Form.Label>
                              <Form.Control as="textarea" rows={3} value={notes} onChange={handleNotesChange} />
                            </Form.Group>
                          </Form>
                          <div className="d-flex flex-column mt-3">
                            <Button variant="primary" className="mb-2" onClick={viewPatientHistory}>View Patient History</Button>
                            <Button onClick={triggerFileInput} variant="primary"className="mb-2" >Upload Xray</Button>
                            <Button variant="primary" onClick={followUpRequests}>Follow Up Requests</Button>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
