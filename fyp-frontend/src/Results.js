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

  // Dummy data for the list of results
  // const results = [
  //   {
  //     id: 1,
  //     xrayImage: 'https://static9.depositphotos.com/1001146/1180/i/450/depositphotos_11802437-stock-photo-x-ray-image-of-human.jpg',
  //     leftAnalysis: {
  //       sign: 'No signs detected',
  //       accuracy: '98%'
  //     },
  //     rightAnalysis: {
  //       sign: 'No signs detected',
  //       accuracy: '97%'
  //     },
  //     overallResult: 'Negative'
  //   },
  //   {
  //     id: 2,
  //     xrayImage: 'https://static9.depositphotos.com/1001146/1180/i/450/depositphotos_11802437-stock-photo-x-ray-image-of-human.jpg',
  //     leftAnalysis: {
  //       sign: 'Abnormality detected',
  //       accuracy: '90%'
  //     },
  //     rightAnalysis: {
  //       sign: 'No signs detected',
  //       accuracy: '95%'
  //     },
  //     overallResult: 'Positive'
  //   },
  //   // Add more result objects as needed
  // ];

  // Function to determine the result color
  const resultColor = (result) => (result.prediction === 'Pneumonia' ? 'danger' : 'success');

  // useEffect(() => {
  //   // Simulate loading delay (e.g., fetching data from API)
  //   const fetchResults = async () => {
  //     try {
  //       // Simulate fetching data (e.g., fetching results from server)
  //       await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2-second delay
  //       setLoading(false); // Set loading to false after fetching data
  //     } catch (error) {
  //       console.error('Error fetching results:', error);
  //     }
  //   };

  //   fetchResults();
  // }, []); // Empty dependency array to run effect only once on component mount

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
