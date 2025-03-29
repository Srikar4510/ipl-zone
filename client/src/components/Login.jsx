import React, { useState } from 'react';
import axios from "../utils/axios"; 
import { useNavigate, Link } from 'react-router-dom';
import "./AuthForm.css";

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      setMessage(err.response ? err.response.data.msg : 'Login failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={onSubmit}>
        <input 
          type="email" name="email" placeholder="Enter your email"
          className="input-field" value={formData.email} onChange={onChange} required
        />
        <input 
          type="password" name="password" placeholder="Enter your password"
          className="input-field" value={formData.password} onChange={onChange} required
        />
        <button type="submit" className="button">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
