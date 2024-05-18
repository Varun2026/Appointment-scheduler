import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const location = useLocation();
  const registrationSuccess = location.state?.registrationSuccess;

  // State to manage the visibility of the login success and failure messages
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFailure, setLoginFailure] = useState(false);

  // State to store form data
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate()

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send login data to backend
    axios.post('http://localhost:3000/login', formData)
      .then(response => {
        console.log('Login successful:', response.data);
        // Handle login success, such as redirecting to another page
        if (response.data.message === "Login successful") {
          setLoginSuccess(true); // Set login success state to true
          setLoginFailure(false); // Reset login failure state
          setTimeout(() => {
            navigate('/home'); // Redirect to home page after 4 seconds
          }, 3000);
        }
      })
      .catch(error => {
        console.error('Login failed:', error.response.data);
        // Handle login failure, such as displaying an error message
        setLoginFailure(true); // Set login failure state to true
        setLoginSuccess(false); // Reset login success state
      });
  };

  return (
    <div className='login'>
      <div className="container">
        <h2>Login</h2>
        {registrationSuccess && <p className="success-message">Registration successful! You can Login now.</p>}
        {loginSuccess && <p className="success-message">Login Successful :)</p>}
        {loginFailure && <p className="error-message">Login Failed :( Please check your credentials.</p>}

        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} required />

            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} required />

            <input type="submit" value="Login" />
        </form>
      </div>
    </div>
  );
}

export default Login;
