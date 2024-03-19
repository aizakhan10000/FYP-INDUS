import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css-files/Homepage.css'; // Ensure you have this CSS file

// Importing the logos - adjust the path as necessary
import indusLogo from './logo.png'; // The first logo you uploaded
import xrayLogo from './logo2.jpg'; // The second logo you provided

function Homepage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container className="homepage-container text-center">
      <Row className="align-items-center my-5">
        <Col>
          <img src={indusLogo} alt="Indus Hospital Logo" className="logo mx-2" />
          <span className="collaboration-symbol">＆</span>
          <img src={xrayLogo} alt="Automated X-Ray Detection Logo" className="logo mx-2" />
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <h2 className="motto">Beacon of Hope and Healing</h2>
          <p>Indus Hospital and Health Network stands as a beacon of hope and healing in Pakistan, providing accessible, high-quality healthcare to all, regardless of their ability to pay. Through innovative approaches and community engagement, IHHN strives to uphold its vision of a healthier, more equitable society for all.</p>
        </Col>
      </Row>
      <Row className="my-5">
        <Col>
          <Button size="lg" variant="primary" onClick={handleLogin}>Login</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Homepage;
