import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css'; // Ensure this path is correct
import logo from './logo.png'; // Update the path according to your project structure
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // State to handle login errors

  const handleSubmit = (event) => {
    event.preventDefault();
    // Reset login error state on each submission
    setLoginError('');

    // Using fetch to POST login details
    fetch('http://localhost:3000/radiologist/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      console.log('Login successful', data);
      // Navigate to dashboard or other intended route upon successful login
      navigate("/dashboard");
    })
    .catch(error => {
      console.error('Login error:', error);
      setLoginError('Failed to login. Please check your credentials and try again.');
    });
  };

  return (
    <div className="container-fluid h-100">
      <div className="row h-100">
        <div className="col-md-6 blue-background d-flex flex-column justify-content-center align-items-center text-white min-vh-100">
          <img src={logo} alt="Indus Hospital & Health Network Logo" className="img-fluid mb-4" />
          <h1>INDUS HOSPITAL</h1>
          <h2>HEALTH NETWORK</h2>
          <p>Faith</p>
          <p>Absolute belief that all means are from the Almighty</p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="card-login w-100 p-4">
            <h3 className="card-title text-center mb-4">Login Screen</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {loginError && <div className="alert alert-danger" role="alert">{loginError}</div>}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <a href="#forgot-password" className="text-decoration-none">Forgot Password?</a>
              </div>
              <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;