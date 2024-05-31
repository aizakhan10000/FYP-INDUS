import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button, Form, Image, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/Dashboard.css';
import Sidebar from './Sidebar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const Patients = () => {
  let navigate = useNavigate();

  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [showGenerateReport, setShowGenerateReport] = useState(false);
  const [classificationResult, setClassificationResult] = useState(null);
  const [showGeneratePdf, setShowGeneratePdf] = useState(false);
  const [xrayId, setXrayId] = useState('');
  // const [reportResult, setReportResult] = useState('');
  const fileInputRef = useRef();
  const [hover, setHover] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3000/patient/getAllPatients')
      // .then(response => {
      //   if (!response.ok) throw new Error('Failed to fetch');
      //   return response.json();
      // })
      .then(response => {
        const patients = response.data.data.patients;
        setPatients(patients);
        setFilteredPatients(patients);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Fetching error:', error);
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const results = patients.filter(patient => {
      const matchesName = patient.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDate = selectedDate ? new Date(patient.visitDate).toDateString() === new Date(selectedDate).toDateString() : true;
      return matchesName && matchesDate;
    });
    setFilteredPatients(results);
  }, [searchTerm, selectedDate, patients]);

  useEffect(() => {
    if (xrayId) {
      console.log("XRAY ID: ", xrayId);
    }
  }, [xrayId]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

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
      setSelectedImage(file); // Ensure this is a File object, not a URL
      setSelectedImageUrl(URL.createObjectURL(file)); // URL to display the image
      setShowGenerateReport(true);
    } else {
      setSelectedImage(null);
      setSelectedImageUrl(null);
      setShowGenerateReport(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const generateReport = async () => {
    const formData = new FormData();
    console.log('Selected Image:', selectedImage); // Verify the file object
    formData.append('image', selectedImage);
    console.log('FormData:', formData.get('image')); // Verify the FormData object
    const patientID = selectedPatient._id;
    console.log("PATIENT ID: ", patientID);
    try {
      const response = await axios.post(`http://localhost:3000/xray/uploadXray/${patientID}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setXrayId(response.data.xray._id);
      // console.log("XRAY ID: ", xrayId)
      setClassificationResult(JSON.stringify(response.data.result.prediction, null, 2));
      setShowGeneratePdf(true); // Show the "Generate PDF" button
      console.log("REPORT RESULT: ",classificationResult )
    } catch (error) {
      console.error('Error uploading X-ray:', error);
      setClassificationResult('Failed to generate report.');
      setShowGeneratePdf(false); // Hide the "Generate PDF" button if there's an error
    }
  };
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Not uploaded':
        return { backgroundColor: 'blue', color: 'black' }; // Blue
      case 'Normal':
        return { backgroundColor: 'yellow', color: 'black' }; // Yellow
      case 'Pneumonia':
        return { backgroundColor: 'red', color: 'black' }; // Red
      case 'Verified':
        return { backgroundColor: 'green', color: 'black' }; // Green
      default:
        return {};
    }
  };
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const goToAddPatient = () => {
    navigate('/patient-add');
  };
  const goToAddAppointment = () => {
    navigate('/create-appointment',{
      state:{
        patient_id: selectedPatient._id,
        xray_id: xrayId,
      }
    });
  };

  function ResultBox({ result }) {
    const isNormal = result.includes("Normal");
    const boxStyle = {
      padding: '10px',
      margin: '10px 0',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
      backgroundColor: isNormal ? 'green' : 'red'
    };

    return (
      <div style={boxStyle}>
        {result}
      </div>
    );
  }


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
                  <Form inline>
                    <Form.Control
                      type="text"
                      placeholder="Search patients..."
                      className="mr-sm-2"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      style={{ borderRadius: '30px', marginRight: '10px' }}
                    />
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      customInput={<Button style={{ borderRadius: '0 30px 30px 0' , backgroundColor: hover ? '#cc1f25' : '#e8232a',
                      borderColor: hover ? '#cc1f25' : '#e8232a',
                      color: 'white'}} onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}
                      onFocus={() => setHover(true)}
                      onBlur={() => setHover(false)}><FontAwesomeIcon icon={faCalendarAlt} /></Button>}
                      className="form-control"
                      style={{ borderRadius: '30px', width: '30px' }}
                    />
                    <Button variant="danger" onClick={goToAddPatient} style={{ backgroundColor: '#e8232a', marginLeft: '10px' }}>Add Patient</Button>
                  </Form>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Patient Name</th>
                        <th>Status</th>
                        <th>City</th>
                        <th>Patient ID</th>
                        <th>Phone No</th>
                        <th>Gender</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPatients.map(patient => (
                        <tr key={patient._id}>
                          <td>{patient.name}</td>
                          <td>
                            <span className="badge" style={{ ...getStatusStyle(patient.status), borderRadius: '5px', padding: '5px 10px' }}>
                              {patient.status}
                            </span>
                          </td>
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
                      {selectedImageUrl ? (
                        <Image src={selectedImageUrl} alt="Uploaded" rounded />
                      ) : (
                        <p>No Image Uploaded</p>
                      )}
                    </div>
                    <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" />
                    {classificationResult ? (
                    <div>
                      {/* <p>{classificationResult}</p> */}
                      {classificationResult && <ResultBox result={classificationResult} />}
                      <Button onClick={() => navigate('/generate-pdf')} className="action-button mt-2">Generate PDF</Button>
                    </div>
                  ) : (
                    showGenerateReport && (
                      <Button onClick={generateReport} className="action-button mt-2">Generate Report</Button>
                    )
                  )}
                    {/* {showGenerateReport && <Button onClick={generateReport} className="action-button mt-2">Generate Report</Button>} */}
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
            <Button className="action-button" onClick={goToAddAppointment} >Create Appointment</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Patients;
