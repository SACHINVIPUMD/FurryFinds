import React, { useState, useContext } from 'react';
import axios from 'axios';
import './PaymentPage.css';
import creditCardIcon from '../Assets/creditcardicon.png';
import paypalIcon from '../Assets/paypalicon.png';
import upiIcon from '../Assets/upi_icon.png';
import { ShopContext } from '../../Context/ShopContext';
import { AuthContext } from '../../Context/AuthContext';

const PaymentPage = () => {
  const { cartItems, all_product, getTotalCartAmount } = useContext(ShopContext);
  const { user, setUser } = useContext(AuthContext);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard');
  const [phoneNumber, setPhoneNumber] = useState(user?.phno || '');
  const [address, setAddress] = useState(user?.address || '');

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePayNow = async () => {
    try {
      // Update user address and phone number
      const response = await axios.put(`http://localhost:8080/api/auth/update/${user.id}`, {
        address: address,
        phno: phoneNumber,
      });
  
      // Update the user in AuthContext
      setUser(response.data);
  
      // Prepare order items
      const orderItems = Object.keys(cartItems).map(key => {
        const item = all_product.find(product => product.id === Number(key));
        if (item && cartItems[key] > 0) {
          return {
            productId: item.id,
            productName: item.name,
            description: item.description,
            productPrice: item.new_price,
            quantity: cartItems[key],
          };
        }
        return null;
      }).filter(item => item !== null);
  
      // Send each order item to backend individually
      for (const orderItem of orderItems) {
        await axios.post(`http://localhost:8080/api/orders/${user.id}/items`, orderItem);
      }
  
      alert('Payment successful and order placed');
    } catch (error) {
      console.error('Error processing payment or placing order:', error);
      alert('Payment failed. Please try again.');
    }
  };
  

  return (
    <div className="payment-page">
      <h1>Checkout</h1>
      <div className="payment-container">
        <div className="order-summary">
          <h2>Order Summary</h2>
          <ul>
            {Object.keys(cartItems).map(key => {
              const item = all_product.find(product => product.id === Number(key));
              if (item && cartItems[key] > 0) {
                return (
                  <li key={item.id}>
                    <span>{item.name}</span>
                    <span>{item.new_price} $</span>
                    <span>Qty: {cartItems[key]}</span>
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <div className="total">
            <span>Total:</span>
            <span>{getTotalCartAmount()} $</span>
          </div>
        </div>
        <div className="payment-method">
          <h2>Payment Method</h2>
          <div className="payment-options">
            <div
              className={`payment-option ${selectedPaymentMethod === 'creditCard' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange('creditCard')}
            >
              <img src={creditCardIcon} alt="Credit Card" />
              <span>Credit Card</span>
            </div>
            <div
              className={`payment-option ${selectedPaymentMethod === 'paypal' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange('paypal')}
            >
              <img src={paypalIcon} alt="PayPal" />
              <span>PayPal</span>
            </div>
            <div
              className={`payment-option ${selectedPaymentMethod === 'upi' ? 'selected' : ''}`}
              onClick={() => handlePaymentMethodChange('upi')}
            >
              <img src={upiIcon} alt="UPI" />
              <span>UPI</span>
            </div>
          </div>
          <div className="user-details">
            <input
              type="text"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          {selectedPaymentMethod === 'creditCard' && (
            <div className="credit-card-form">
              <input type="text" placeholder="Card Number" />
              <input type="text" placeholder="Cardholder Name" />
              <input type="text" placeholder="Expiration Date (MM/YY)" />
              <input type="text" placeholder="CVV" />
            </div>
          )}
          {selectedPaymentMethod === 'paypal' && (
            <div className="paypal-form">
              <p>You will be redirected to PayPal to complete your purchase.</p>
            </div>
          )}
          {selectedPaymentMethod === 'upi' && (
            <div className="upi-form">
              <p>Please complete your payment through your UPI app.</p>
            </div>
          )}
          <button className="pay-button" onClick={handlePayNow}>Pay Now</button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
