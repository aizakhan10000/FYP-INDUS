import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../actions/userActions'; // Define setUser action
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/LoginPage.css'; // Ensure this path is correct
import logo from '../logo.png'; // Update the path according to your project structure
import { useNavigate, useLocation } from 'react-router-dom';

const textVariations = [
  {
    title: 'Faith',
    description: 'Absolute belief that all means are from the Almighty',
  },
  {
    title: 'Respect',
    description: 'Extending courtesy to all stakeholders – patients, colleagues, staff, partners, donors, suppliers.',
  },
  {
    title: 'Integrity',
    description: 'Honesty, fairness and self scrutiny in all actions to ensure safety, confidentiality and privacy.',
  },
  {
    title: 'Justice & Equity',
    description: 'Ensure fairness in all processes.',
  }
];


function ForgotPassword() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % textVariations.length);
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setUserId(id);
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Using fetch to POST forgot password details
    try {
      // Using fetch to POST login details
      const response = await fetch(`http://localhost:3000/radiologist/forgot-password/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Password reset failed');
      }
      setMessage('Password updated successfully. Please log in with your new password.');
      // Redirect to login page after 2 seconds
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
        setMessage('Failed to update password. Please try again.');
    }
  };
  const { title, description } = textVariations[currentIndex];
  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-md-6 blue-background d-flex flex-column justify-content-center align-items-center text-white min-vh-100">
          <img src={logo} alt="Indus Hospital & Health Network Logo" className="img-fluid mb-4" />
          <h1>INDUS HOSPITAL</h1>
          <h2>HEALTH NETWORK</h2>
          <p className='p'>{title}</p>
          <p className='p'>{description}</p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="card-login w-100 p-4">
            <h3 className="card-title text-center mb-4">Update Password</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Update Password</button>
            </form>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
