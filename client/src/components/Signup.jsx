import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import "./AuthForm.css"; // Or AuthForm.css

function Signup() {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const { username, email, password } = formData;
      const res = await axios.post('http://localhost:5000/api/auth/signup', { email, password, username });
      setMessage(res.data.msg);
      localStorage.setItem('signupEmail', email);
      navigate('/verify-otp');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage(err.response ? err.response.data.msg : 'Signup failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={onSubmit}>
        <input 
          type="text" name="username" placeholder="Enter your username"
          className="input-field" value={formData.username} onChange={onChange} required
        />
        <input 
          type="email" name="email" placeholder="Enter your email"
          className="input-field" value={formData.email} onChange={onChange} required
        />
        <input 
          type="password" name="password" placeholder="Enter your password"
          className="input-field" value={formData.password} onChange={onChange} required
        />
        <input 
          type="password" name="confirmPassword" placeholder="Confirm your password"
          className="input-field" value={formData.confirmPassword} onChange={onChange} required
        />
        <button type="submit" className="button">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
