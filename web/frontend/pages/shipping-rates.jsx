// src/pages/shipping-rates.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ShippingRates.css'; // Import the CSS file

const ShippingRatesPage = () => {
  const [shippingRates, setShippingRates] = useState([]);
  const [customerGroup, setCustomerGroup] = useState('');
  const [shippingPrice, setShippingPrice] = useState('');

  // Function to fetch shipping rates from the API
  const fetchShippingRates = async () => {
    try {
      const response = await axios.get('/api/shipping-rates');
      setShippingRates(response.data);
    } catch (error) {
      console.error('Error fetching shipping rates:', error);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/shipping-rates', { customerGroup, shippingPrice });
      fetchShippingRates(); // Refresh the list of shipping rates
      setCustomerGroup(''); // Clear input fields
      setShippingPrice('');
    } catch (error) {
      console.error('Error adding shipping rate:', error);
    }
  };

  // Fetch shipping rates when the component mounts
  useEffect(() => {
    fetchShippingRates();
  }, []);

  return (
    <div className="shipping-rates-container">
      <h1 className="title">Shipping Rates</h1>
      <form className="shipping-rates-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="customer-group" className="form-label">Customer Group</label>
          <input
            id="customer-group"
            type="text"
            value={customerGroup}
            onChange={(e) => setCustomerGroup(e.target.value)}
            placeholder="Enter customer group"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="shipping-price" className="form-label">Shipping Price</label>
          <input
            id="shipping-price"
            type="number"
            value={shippingPrice}
            onChange={(e) => setShippingPrice(e.target.value)}
            placeholder="Enter shipping price"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Shipping Rate</button>
      </form>
      <ul className="shipping-rates-list">
        {shippingRates.map((rate) => (
          <li key={rate._id} className="shipping-rate-item">
            <span className="customer-group">{rate.customerGroup}</span>
            <span className="shipping-price">${rate.shippingPrice.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingRatesPage;
