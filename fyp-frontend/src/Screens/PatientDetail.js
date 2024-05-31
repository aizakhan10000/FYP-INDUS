import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Image, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/Dashboard.css'; // Adjust the path as necessary
import Sidebar from './Sidebar'; // Adjust as necessary
import { useNavigate, useParams } from 'react-router-dom';
import { uploadImages } from '../actions/uploadActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const PatientDetails = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  let { id } = useParams();
  const [notes, setNotes] = useState('');
  const [patient, setPatient] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [reportResult, setReportResult] = useState('');
  const [modalShow, setModalShow] = useState(true);  // State to control the visibility of the modal

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/patient/getPatientById/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPatient(data.data.patient);
      } catch (error) {
        console.error('Error fetching patient details:', error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("images/")) {
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
    dispatch(uploadImages(selectedImage));
    setSelectedImage({});
    navigate("/result");
    // const formData = new FormData();
    // formData.append('image', selectedImage);
    // try {
    //   const response = await axios.post('http://localhost:3000/xray/uploadXray', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    //   setReportResult(JSON.stringify(response.data.result.prediction, null, 2));
    //   navigate("/result")
    // } catch (error) {
    //   console.error('Error uploading X-ray:', error);
    //   setReportResult('Failed to generate report.');
    // }
  };

  const viewPatientHistory = () => {
    navigate('/patient-history');
  };

  const followUpRequests = () => {
    console.log('Follow-up requests logic goes here.');
  };

  const handleClose = () => setModalShow(false);

  return (
    <Modal show={modalShow} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Patient Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          {patient ? (
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
                  <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="images/*" />
                  {showGenerateReport && <Button onClick={generateReport} className="action-button mt-2">Generate Report</Button>}
                </Col>
                <Col xs={12} md={6}>
                  <Card.Title>{`${patient.name}`}</Card.Title>
                  <Card.Text>{`Gender: ${patient.gender}`}</Card.Text>
                  <Card.Text>{`City: ${patient.city}`}</Card.Text>
                  <Card.Text>{`Phone: ${patient.phoneNo}`}</Card.Text>
                  <Form.Group className="mt-3">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={3} value={notes} onChange={handleNotesChange} />
                  </Form.Group>
                </Col>
              </Row>
            </>
          ) : (
            <p>Loading patient details...</p>
          )}
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button className="action-button" onClick={triggerFileInput}>Upload Xray</Button>
        <Button className="action-button" onClick={followUpRequests}>Follow Up</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PatientDetails;
