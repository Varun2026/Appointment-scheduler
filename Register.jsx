import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    passwordMatchError: ''
  });
  const navigate = useNavigate()

  // State to manage success message
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
      passwordMatchError: name === 'confirmPassword' && formData.password !== value ? 'Passwords do not match!!!' : ''
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      setFormData({
        ...formData,
        passwordMatchError: 'Passwords do not match'
      });
      return;
    }

    // Send registration data to backend
    axios.post('http://localhost:3000/register', formData)
      .then(response => {
        console.log('Registration successful:', response.data);
        // Set registration success state to true
        setRegistrationSuccess(true);
        // Reset form after successful registration
        setFormData({
          firstName: '',
          lastName: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          passwordMatchError: ''
        });
        navigate('/login', { state: { registrationSuccess: true } }); // Pass registration success as state
      })
      .catch(error => {
        console.error('Registration failed:', error.response.data);
        // Handle registration failure, if needed
      });
  };

  return (
    <div className='register'>
      <div className="container">
        <h2>Registration Form</h2>
        {/* Render success message if registrationSuccess is true */}
        {registrationSuccess && <p className="success-message">Registration successful!</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          {/* Display password match error message */}
          {formData.passwordMatchError && <p className="error">{formData.passwordMatchError}</p>}

          <input type="submit" value="Register" />
        </form>
      </div>
    </div>
  );
}

export default Register;
