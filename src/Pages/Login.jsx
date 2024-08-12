import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import './CSS/LoginSignup.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    await login(email, password);

    if (email==='admin@gmail.com') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Login</h1>
        <div className='loginsignup-fields'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>Continue</button>
        <Link style={{ textDecoration: 'none' }} to='/signup'>
          <p className='loginsignup-login'>Don't have an account? <span>Signup Here</span></p>
        </Link>
      </div>
    </div>
  );
};

export default Login;
