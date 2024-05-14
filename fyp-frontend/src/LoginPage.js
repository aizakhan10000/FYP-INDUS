import React, { useState } from 'react';
import './LoginPage.css'; // Ensure this path is correct
import logo from './logo.png'; // Ensure this is the correct path to your logo
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  let navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = (event) => {
    console.log("This has been called!!!!!!!!!!");
    event.preventDefault();
    setLoginError('');

    fetch('http://localhost:3000/api/login', { // Modify the URL based on your backend API
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Login failed');
      }
      return response.json();
    })
    .then(data => {
      navigate("/dashboard");
    })
    .catch(error => {
      console.log("ERRRRORRR!!!!!!!");
      setLoginError('Login failed. Please check your credentials and try again.');
    });
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="logo-container">
          <img src={logo} alt="Indus Hospital Logo" className="login-logo" />
          <div style={{ marginTop: "10px" }}></div>  {/* Adds space between logo and tagline */}
          
        </div>

        <div className="logo-container">
          {/* <img src={logo} alt="Indus Hospital Logo" className="login-logo" /> */}
          <h4 className="tagline">INDUS HOSPITAL HEALTH NETWORK</h4>
          <div style={{ marginTop: "10px" }}></div>  {/* Adds space between logo and tagline */}
          
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {loginError && <div className="alert alert-danger">{loginError}</div>}
        <button type="submit" className="btn button-danger btn-block">Log In</button>
        <div className="login-links">
          <a href="/forgot-password">Forgot Password?</a>
          <a href="/signup">Sign Up</a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
