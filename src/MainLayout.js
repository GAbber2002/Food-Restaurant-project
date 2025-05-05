import React from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

function MainLayout({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <header className="menu-bar" style={{ backgroundColor: '#007bff', padding: '10px', color: 'white' }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ fontWeight: 'bold', fontSize: '20px' }}>
            Food's Restaurant
          </div>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Sign In</Link>
            <Link to="/login" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Login</Link>
            <Link to="/register" style={{ color: 'white', textDecoration: 'none', marginRight: '15px' }}>Register</Link>
            {user && (
              <span style={{ marginLeft: 'auto', fontWeight: 'bold' }}>
                Welcome, {user.email}
              </span>
            )}
          </div>
        </nav>
      </header>
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
