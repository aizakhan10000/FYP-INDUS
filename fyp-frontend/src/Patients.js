import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Image, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Dashboard.css'; // Adjust if necessary
import Sidebar from './Screens/Sidebar'; // Ensure the correct path
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Patients = () => {
  let navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [reportResult, setReportResult] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    fetch('http://localhost:3000/patient/getAllPatients') // Adjust your API endpoint accordingly
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        setPatients(data.data.patients); // Adjust based on your actual response structure
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Fetching error:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const handleExplore = (patient) => {
    setSelectedPatient(patient);
    setModalShow(true);
  };

  const handleClose = () => setModalShow(false);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      setShowGenerateReport(true);
    } else {
      setSelectedImage(null);
      setShowGenerateReport(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const generateReport = async () => {
    const formData = new FormData();
    formData.append('image', selectedImage);
    try {
      const response = await axios.post('http://localhost:3000/xray/uploadXray', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setReportResult(JSON.stringify(response.data.result.prediction, null, 2));
    } catch (error) {
      console.error('Error uploading X-ray:', error);
      setReportResult('Failed to generate report.');
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const goToAddPatient = () => {
    navigate('/patient-add');
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
              <h1>Patient Management</h1>
            </div>
            <div className="container-fluid pt-4 fade-in">
              <div className="row">
                <div className="col-12 mt-4">

                  <h2>Patient List</h2>
                  {/* <Button variant="primary" onClick={goToAddPatient} className="mb-3">Add Patient</Button> */}
                  <Button variant="danger" onClick={goToAddPatient} style={{ backgroundColor: '#e8232a' }}>Add Patient</Button>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>City</th>
                        <th>Patient ID</th>
                        <th>Phone No</th>
                        <th>Gender</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map((patient) => (
                        <tr key={patient._id}>
                          <td>{patient.name}</td>
                          <td>{patient.city}</td>
                          <td>{patient.PatientID}</td>
                          <td>{patient.phoneNo}</td>
                          <td>{patient.gender}</td>
                          <td>
                            <Button variant="danger" onClick={() => handleExplore(patient)} style={{ backgroundColor: '#e8232a' }}>Explore</Button>
                          </td>
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

      {selectedPatient && (
        <Modal show={modalShow} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Patient Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <>
                <Row>
                  <Col xs={12} md={6} className="mb-3">
                    <div className="image-upload-box">
                      {selectedImage ? (
                        <Image src={selectedImage} alt="Uploaded" rounded />
                      ) : (
                        <p>No Image Uploaded</p>
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                    {showGenerateReport && <Button onClick={generateReport} className="action-button mt-2">Generate Report</Button>}
                  </Col>
                  <Col xs={12} md={6}>
                    <Card.Title>{`${selectedPatient.name}`}</Card.Title>
                    <Card.Text>{`Gender: ${selectedPatient.gender}`}</Card.Text>
                    <Card.Text>{`City: ${selectedPatient.city}`}</Card.Text>
                    <Card.Text>{`Phone: ${selectedPatient.phoneNo}`}</Card.Text>
                    <Form.Group className="mt-3">
                      <Form.Label>Notes</Form.Label>
                      <Form.Control as="textarea" rows={3} value={notes} onChange={handleNotesChange} />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button className="action-button" onClick={triggerFileInput}>Upload Xray</Button>
            <Button className="action-button" onClick={() => navigate('/patient-history')}>View History</Button>
            <Button className="action-button" onClick={() => console.log('Follow-up requests logic goes here.')}>Follow Up</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Patients;
