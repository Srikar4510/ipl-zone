import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./OTPVerification.css";

const OTPVerification = () => {
  const [email, setEmail] = useState(localStorage.getItem('signupEmail') || '');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage(err.response ? err.response.data.msg : 'Error verifying OTP');
    }
  };

  return (
    <div className="otp-container">
      <h2>OTP Verification</h2>
      {message && <p className="error">{message}</p>}
      <form onSubmit={onSubmit} className="otp-form">
        <input 
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          className="input-field"
        />
        <input 
          type="text" 
          placeholder="Enter OTP" 
          value={otp} 
          onChange={(e) => setOtp(e.target.value)} 
          required 
          className="input-field"
        />
        <button type="submit" className="button">Verify OTP</button>
      </form>
    </div>
  );
};

export default OTPVerification;
