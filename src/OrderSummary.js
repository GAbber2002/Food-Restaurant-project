import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

function OrderSummary() {
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = localStorage.getItem('orderItems');
    if (savedOrder) {
      setOrderItems(JSON.parse(savedOrder));
    } else {
      // If no order items, redirect back to menu
      navigate('/foodmenu');
    }
  }, [navigate]);

  const totalPrice = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleConfirm = () => {
    // Clear order and navigate to thank you page
    localStorage.removeItem('orderItems');
    navigate('/thankyou');
  };

  const handleCancel = () => {
    // Clear order and navigate back to menu
    localStorage.removeItem('orderItems');
    navigate('/foodmenu');
  };

  return (
    <div className="SignIn-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
      {/* Restaurant Ribbon */}
      <div style={{ width: '100%', backgroundColor: '#ff6347', color: 'white', padding: '15px 20px', fontSize: '1.8rem', fontWeight: 'bold', textAlign: 'center', boxShadow: '0 2px 5px rgba(0,0,0,0.3)' }}>
        Food Restaurant
      </div>

      {/* Centered Container */}
      <div className="SignIn-contentContainer" style={{ maxWidth: '700px', width: '100%', marginTop: '30px', padding: '30px', borderRadius: '10px', backgroundColor: 'white', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Order Summary</h2>
        {orderItems.length === 0 ? (
          <p style={{ fontSize: '1.2rem', color: '#666' }}>No items in your order.</p>
        ) : (
          <>
            <ul className="SignIn-list" style={{ textAlign: 'left', maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
              {orderItems.map(item => (
                <li key={item.id} className="SignIn-listItem" style={{ padding: '10px 0', borderBottom: '1px solid #ddd' }}>
                  <div className="SignIn-listItemContent" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', color: '#444' }}>
                    <span>{item.name} x {item.quantity}</span>
                    <span>Rs {item.price * item.quantity}</span>
                  </div>
                </li>
              ))}
            </ul>
            <h3 style={{ color: '#222' }}>Total: Rs {totalPrice}</h3>
            <div className="SignIn-buttonGroup" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              <button className="SignIn-btnConfirm" onClick={handleConfirm} style={{ flex: 1, marginRight: '10px', fontSize: '1.1rem' }}>
                Confirm Order
              </button>
              <button className="SignIn-btnCancel" onClick={handleCancel} style={{ flex: 1, marginLeft: '10px', fontSize: '1.1rem' }}>
                Cancel
              </button>
            </div>
          </>
        )}
        {/* Thank You Message */}
        <div className="SignIn-thankYouMessage" style={{ marginTop: '40px', fontSize: '1.3rem', color: '#28a745', fontWeight: 'bold' }}>
          Thank you for your order!
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
