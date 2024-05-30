import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import './css-files/Dashboard.css'; // Adjust the path as needed

const XRay = () => {
  const [xrays, setXrays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    // Function to fetch X-rays from the API using GET method
    
    const fetchXrays = async () => {
        console.log("FETCHing xrays")
        try {
          const response = await fetch('localhost:3000/xray/xrays', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error(`Errorrrrrr.HTTP error! status: ${response.status}`);
          }
          // Try to parse the response as JSON
          try {
            const data = await response.json();
            setXrays(data.xrays);
            setLoading(false);
          } catch (error) {
            throw new Error('Response not in JSON format');
          }
        } catch (err) {
          console.error("Failed to fetch X-rays:", err);
          setError("Failed to fetch X-rays");
          setLoading(false);
        }
      };

    fetchXrays();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading X-rays...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center"><p>{error}</p></div>;
  }

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        {xrays.map((xray) => (
          <Col key={xray.xrayId} xs={12} md={6} lg={4}>
            <Card className="mb-4">
              <Card.Header>X-Ray ID: {xray.xrayId}</Card.Header>
              <Card.Body>
                <div style={{ width: '100%', height: '200px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={xray.imageUrl} alt="X-ray" style={{ width: 'auto', height: '100%' }} />
                </div>
                <Card.Text className="mt-3">Date: {new Date(xray.date).toLocaleDateString()}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">Details</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default XRay;
