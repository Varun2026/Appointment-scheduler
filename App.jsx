import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './Register';
import Login from './Login';
import HomePage from './HomePage';

const Home = () => {
  return (
    <div className="home">
      <h2>Welcome to my <span className='highlight'> Appointment</span> scheduler!</h2>
      <div className="options">
      <h3>New User? Register Now.</h3>
        <Link to="/register">Register</Link>
        <h3>Already Have an Account? Just Login.</h3>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
