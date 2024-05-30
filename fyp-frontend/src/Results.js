import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Dashboard.css'; // Ensure the path matches your CSS file for consistent styling
import Sidebar from './Screens/Sidebar'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Result = () => {
  const [loading, setLoading] = useState(true); // State to control loading animation
  const navigate = useNavigate();

  // Access the uploaded results from the Redux state
  const uploadState = useSelector(state => state.upload);
  const results = uploadState.data || [];
  console.log("UPLOADED DATA: ",uploadState);
  console.log("results: ",results);

  useEffect(() => {
    if (uploadState.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [uploadState.loading]);

 

  // Function to determine the result color
  const resultColor = (result) => (result.prediction === 'Pneumonia' ? 'danger' : 'success');

  const handleBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="dashboard-container">
            <Button variant="secondary" onClick={handleBack} className="mb-3">
              Back
            </Button>
            <Container className="my-4">
              {loading ? ( // Display loading spinner while loading is true
                <Row className="justify-content-center">
                  <Col className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p>Loading results...</p>
                  </Col>
                </Row>
              ) : ( // Display results once loading is false
                <Row className="justify-content-center">
                  {results.map((result) => (
                    <Col key={result.id} xs={12} md={6} lg={4}>
                      <Card className="mb-4">
                        <Card.Header>Result ID: {result.id}</Card.Header>
                        <Card.Body>
                          <div style={{ width: '100%', height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img src={result.xray.image} alt="X-ray" style={{ width: 'auto', height: '100%' }} />
                          </div>
                          {/* <Card.Text className="mt-3">
                            <strong>Left Analysis:</strong> {result.leftAnalysis.sign}, {result.leftAnalysis.accuracy}
                          </Card.Text>
                          <Card.Text>
                            <strong>Right Analysis:</strong> {result.rightAnalysis.sign}, {result.rightAnalysis.accuracy}
                          </Card.Text> */}
                          <Card className={`text-center bg-${resultColor(result)} text-white`}>
                            <Card.Body>{result.result.prediction === 'Pneumonia' ? 'Pneumonia' : 'Normal'}</Card.Body>
                          </Card>
                        </Card.Body>
                        <Card.Footer className="text-muted">Report</Card.Footer>
                      </Card>
                    </Col>
                  ))}
                </Row>
              )}
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
