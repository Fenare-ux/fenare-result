import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    email: '',
    password: '',
    unvan: '',
    kartNomresi: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isSignup) {
      setSuccessMessage('Signup Successful!');
    } else {
      setSuccessMessage('Login Successful!');
    }
  };

  return (
    <div className="form-container">
      <h2>Login Form</h2>

      <div className="toggle-buttons">
        <button
          className={!isSignup ? 'active' : ''}
          onClick={() => {
            setIsSignup(false);
            setSuccessMessage('');
          }}
        >
          Login
        </button>
        <button
          className={isSignup ? 'active' : ''}
          onClick={() => {
            setIsSignup(true);
            setSuccessMessage('');
          }}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <>
            <input
              type="text"
              name="ad"
              placeholder="Ad"
              value={formData.ad}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="soyad"
              placeholder="Soyad"
              value={formData.soyad}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {isSignup && (
          <>
            <input
              type="text"
              name="unvan"
              placeholder="Ünvan"
              value={formData.unvan}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="kartNomresi"
              placeholder="Kart Nömrəsi"
              value={formData.kartNomresi}
              onChange={handleChange}
              required
            />
          </>
        )}

        {!isSignup && <p className="forgot">Forgot password?</p>}
        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      <p className="bottom-text">
        {!isSignup ? 'Not a member?' : 'Already have an account?'}{' '}
        <span onClick={() => {
          setIsSignup(!isSignup);
          setSuccessMessage('');
        }}>
          {isSignup ? 'Login now' : 'Signup now'}
        </span>
      </p>
    </div>
  );
};

export default Login;

