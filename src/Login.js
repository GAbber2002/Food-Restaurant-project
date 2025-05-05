import React, { useState } from 'react';
import './SignIn.css';

function Login() {
  const [email, setEmail] = useState('abcd@gmail.com');
  const [password, setPassword] = useState('1234');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  const validate = () => {
    const newErrors = {};
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
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Default login condition for abcd@gmail.com and password 1234
      if (email === 'abcd@gmail.com' && password === '1234') {
        localStorage.setItem('user', JSON.stringify({ email }));
        alert('Login successful!');
        window.location.href = '/';
        return;
      }
      try {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('Login successful!');
          // Redirect to main layout page instead of sign-in page
          window.location.href = '/mainlayout';
        } else {
          const errorData = await response.json();
          setLoginError(errorData.error || 'Invalid credentials');
        }
      } catch (error) {
        setLoginError(error.message);
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit} noValidate>
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
          {loginError && <div className="error">{loginError}</div>}
          <button type="submit">Login</button>
          <div style={{ marginTop: '10px', textAlign: 'center' }}>
            <a href="/register" className="register-link">Not registered? Register here</a>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
