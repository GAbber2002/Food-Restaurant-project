import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './SignIn';
import Login from './Login';
import Register from './Register';
import MainLayout from './MainLayout';
import FoodMenu from './FoodMenu';

const GoToMenu = () => <h2>GoTo Menu Page (Protected)</h2>;
const OrderSummary = () => <h2>Order Summary Page (Protected)</h2>;
const ThankYou = () => <h2>Thank You Page (Protected)</h2>;

const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/mainlayout"
          element={
            <PrivateRoute>
            <MainLayout>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh', fontSize: '2rem', fontWeight: 'bold' }}>
                Main Content Centered
                <button
                  style={{
                    marginTop: '20px',
                    padding: '10px 20px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: 'white',
                  }}
                  onClick={() => window.location.href = '/foodmenu'}
                >
                  Go to Menu
                </button>
              </div>
            </MainLayout>
            </PrivateRoute>
          }
        />
        <Route
          path="/gotomenu"
          element={
            <PrivateRoute>
              <GoToMenu />
            </PrivateRoute>
          }
        />
        <Route
          path="/foodmenu"
          element={
            <PrivateRoute>
              <FoodMenu />
            </PrivateRoute>
          }
        />
        <Route
          path="/ordersummary"
          element={
              <OrderSummary />
          }
        />
        <Route
          path="/thankyou"
          element={
            <PrivateRoute>
              <ThankYou />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
