import React, { useState } from 'react';
import './SignIn.css';

const foodItems = [
  { id: 1, name: 'Burger', description: 'Juicy beef burger', price: 8, image: process.env.PUBLIC_URL + '/images/burger.jpeg' },
  { id: 2, name: 'Coke', description: 'Refreshing cold drink', price: 3, image: process.env.PUBLIC_URL + '/images/coke.jpeg' },
  { id: 3, name: 'Fries', description: 'Crispy french fries', price: 5, image: process.env.PUBLIC_URL + '/images/fries.jpeg' },
];

const cardStyles = {
  1: { backgroundColor: '#fff', borderColor: '#ced4da' },
  2: { backgroundColor: '#fff', borderColor: '#ced4da' },
  3: { backgroundColor: '#fff', borderColor: '#ced4da' },
};

function FoodMenu() {
  const [quantities, setQuantities] = useState(
    foodItems.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {})
  );

  const [activeItem, setActiveItem] = useState(null);

  const increment = (id) => {
    setQuantities(prev => ({ ...prev, [id]: prev[id] + 1 }));
    setActiveItem(id);
  };

  const decrement = (id) => {
    setQuantities(prev => {
      const newQty = prev[id] > 0 ? prev[id] - 1 : 0;
      if (newQty !== prev[id]) {
        setActiveItem(id);
      }
      return { ...prev, [id]: newQty };
    });
  };

  const closeBox = () => {
    setActiveItem(null);
  };

  const saveAndCheckout = () => {
    // Save selected items with quantity > 0 to localStorage
    const selectedItems = foodItems
      .filter(item => quantities[item.id] > 0)
      .map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: quantities[item.id],
      }));
    localStorage.setItem('orderItems', JSON.stringify(selectedItems));
    closeBox();
    // Navigate to order summary page
    window.location.href = '/ordersummary';
  };

  return (
    <div className="SignIn-container" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', maxWidth: '1000px', margin: '0 auto' }}>
      <h2>Food Menu</h2>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {foodItems.map(item => (
          <div
            key={item.id}
            className="card"
            id={`card-${item.id}`}
            style={{
              width: '400px',
              border: '1px solid',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              position: 'relative',
              ...cardStyles[item.id]
            }}
          >
            {/* Image above food name */}
            <div style={{ marginBottom: '15px', borderRadius: '4px', overflow: 'visible' }}>
              <img src={item.image} alt={item.name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>{item.name}</h3>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{quantities[item.id]} Item{quantities[item.id] !== 1 ? 's' : ''}</span>
            </div>
            <p>{item.description}</p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Rs {item.price}</span>
              <span style={{ fontSize: '0.9rem', color: '#555' }}>Item Price</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
              <button onClick={() => decrement(item.id)} style={{ marginRight: '10px' }}>-</button>
              <button onClick={() => increment(item.id)} style={{ marginLeft: '10px' }}>+</button>
            </div>
            {activeItem === item.id && (
              <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#fff',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                padding: '20px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                zIndex: 1000,
                width: '500px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                textAlign: 'center'
              }}>
                <div style={{ fontWeight: 'bold', fontSize: '1.5rem', display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>{quantities[item.id]} Item{quantities[item.id] !== 1 ? 's' : ''}</span>
                    <div style={{ display: 'flex', marginTop: '10px' }}>
                      <button onClick={() => decrement(item.id)} style={{ marginRight: '10px' }}>-</button>
                      <button onClick={() => increment(item.id)} style={{ marginLeft: '10px' }}>+</button>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span>Total: Rs {quantities[item.id] * item.price}</span>
                  </div>
                </div>
                <button className="btn btn-primary" onClick={saveAndCheckout} style={{ width: '100%' }}>Save and Checkout</button>
                <button className="btn btn-secondary" onClick={closeBox} style={{ width: '100%' }}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FoodMenu;
