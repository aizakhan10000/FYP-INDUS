import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { setUser } from '../actions/userActions'; // Define setUser action
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css-files/LoginPage.css'; // Ensure this path is correct
import logo from '../logo.png'; // Update the path according to your project structure
import { useNavigate } from 'react-router-dom';

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


function LoginPage() {
    const dispatch = useDispatch();
  let navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // State to handle login errors
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % textVariations.length);
    }, 3000); // Change text every 3 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Reset login error state on each submission
    setLoginError('');
    // Using fetch to POST login details
    try {
      // Using fetch to POST login details
      const response = await fetch('http://localhost:3000/radiologist/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      // Assuming user data is returned from login API
      const userData = await response.json();
      // console.log("USER DATA: ", userData);
      const Data = userData.data
    
      

      // Dispatch action to set user data in Redux store
      dispatch(setUser(Data));

      sessionStorage.setItem('radiologistId', Data._id);

      console.log("USER DATA: ", sessionStorage.getItem("radiologistId"));

      console.log('Login successful', userData);
      // Navigate to dashboard or other intended route upon successful login
      navigate("/dashboard");
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Failed to login. Please check your credentials and try again.');
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
              <a
                  href={username ? `/forgot-password?id=${username}` : "#"}
                  className={`text-decoration-none ${!username && "disabled-link"}`}
                  onClick={(e) => !username && e.preventDefault()}
                  
                >
                  Forgot Password?
                </a>
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
