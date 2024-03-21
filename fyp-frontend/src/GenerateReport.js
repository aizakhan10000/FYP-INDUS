import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Dashboard.css'; // Ensure the path matches your CSS file for consistent styling
import Sidebar from './Screens/Sidebar'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';

const GenerateReport = () => {
  let navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  // Dummy data for the report
  const reportData = {
    xrayImage: 'https://static9.depositphotos.com/1001146/1180/i/450/depositphotos_11802437-stock-photo-x-ray-image-of-human.jpg', // Placeholder path for an X-ray image
    leftAnalysis: {
      sign: 'No signs detected',
      accuracy: '98%'
    },
    rightAnalysis: {
      sign: 'No signs detected',
      accuracy: '97%'
    },
    overallResult: 'Negative' // Change to "Positive" to see the green color
  };

  // Function to determine the result color
  const resultColor = reportData.overallResult === 'Positive' ? 'success' : 'danger';

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="dashboard-container">
            <Button variant="secondary" onClick={handleBack} className="mb-3">Back</Button>
            <Container className="my-4">
              <Row className="justify-content-center">
                <Col md={8}>
                  <Card>
                    <Card.Header>Generated Report</Card.Header>
                    <Card.Body>
                      <Row>
                        <Col xs={12} md={8} className="d-flex justify-content-center">
                          <div style={{ width: '300px', height: '300px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={reportData.xrayImage} alt="X-ray" style={{ width: 'auto', height: '100%' }} />
                          </div>
                        </Col>
                        <Col xs={12} md={4}>
                          <Card.Text>
                            <strong>Left Analysis:</strong><br />
                            {reportData.leftAnalysis.sign}<br />
                            {reportData.leftAnalysis.accuracy}
                          </Card.Text>
                          <Card.Text>
                            <strong>Right Analysis:</strong><br />
                            {reportData.rightAnalysis.sign}<br />
                            {reportData.rightAnalysis.accuracy}
                          </Card.Text>
                          <Card className={`text-center bg-${resultColor} text-white`}>
                            <Card.Body>
                              {reportData.overallResult}
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </Card.Body>
                    <Card.Footer className="text-muted">
                      Report
                    </Card.Footer>
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

export default GenerateReport;
