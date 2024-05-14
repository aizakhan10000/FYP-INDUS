import React, { useState, useEffect,useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Dashboard.css'; // Adjust the path as necessary
import Sidebar from './Screens/Sidebar'; // Adjust as necessary
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const PatientDetails = () => {
  let navigate = useNavigate();
  let { id } = useParams(); // Assuming you're using React Router and passing the patient ID as a URL param
  const [notes, setNotes] = useState('');
  const [patient, setPatient] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [reportResult, setReportResult] = useState(''); // State to store report result
  const [imageFile, setImageFile] = useState(null); // State to store the selected file
  
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/getPatientById/${id}`,{
          method: 'GET',
          headers: {
            'Content-Type':'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.data.patient);
        setPatient(data.data.patient); // Adjust according to your actual API response
      } catch (error) {
        console.error('Error fetching patient details:', error);
        // Handle error (e.g., set an error state, show a message, etc.)
      }
    };

    fetchPatientDetails();
  }, [id]); // Re-run this effect if the ID changes

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      setImageFile(file);
      setShowGenerateReport(true); // Show "Generate Report" button after image is selected
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
    formData.append('image', imageFile); // Use the actual file
    try {
      const response = await axios.post('http://localhost:3000/xray/uploadXray', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setReportResult(JSON.stringify(response.data.result.prediction, null, 2)); // Displaying the response in a formatted string

      // setReportResult(JSON.json(response.data.result, null, 2)); // Displaying the response in a formatted string
    } catch (error) {
      console.error('Error uploading X-ray:', error);
      setReportResult('Failed to generate report.');
    }

    // navigate("/report")
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
                        {reportResult && (
                          <Form.Group className="mt-3">
                            <Form.Label>Report Result</Form.Label>
                            <Form.Control as="textarea" rows="5" readOnly value={reportResult} />
                          </Form.Group>
                        )}
                        <Col xs={12} md={6}>
                          {patient ? (
                            <>
                          <Card.Title className="mt-3">{`${patient.name}`}</Card.Title>
                          <Card.Text>Gender: {patient.gender}</Card.Text>
                          {/* <Card.Text>Age: {patient.age}</Card.Text> */}
                          <Card.Text>City: {patient.city}</Card.Text>
                          <Card.Text>Phone No: {patient.phoneNo}</Card.Text>
                          </>
                          ):(
                          <p>Loading patient details...</p>
                          )}
                
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
