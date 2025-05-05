import React, { useState } from 'react';
import './SignIn.css';

function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = 'Email is not valid';
      }
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fullName, email, password }),
        });
        if (response.ok) {
          alert('Registration successful!');
          setFullName('');
          setEmail('');
          setPassword('');
          setErrors({});
          // Redirect to login page after successful registration
          window.location.href = '/login';
        } else {
          try {
            const errorData = await response.json();
            alert('Error: ' + (errorData.error || 'Failed to register'));
          } catch (error) {
            alert('Failed to register: ' + error.message);
          }
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <header className="menu-bar" style={{ backgroundColor: '#007bff', padding: '10px', color: 'white' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Food's Restaurant
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
            <a href="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Sign In</a>
            <a href="/login" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Login</a>
            <a href="/register" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Register</a>
          </div>
        </nav>
      </header>
      <div className="SignIn-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="fullName">Full Name:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <div className="error">{errors.fullName}</div>}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <div className="error">{errors.password}</div>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
}

export default Register;
