import React from 'react';
import './SellerDetails.css';
import sellerImage from '../Assets/team_icon.png'; // Placeholder image for seller

const SellerDetails = () => {
  const seller = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    address: '1234 Pet Street, Pet City, PC 12345',
    phone: '+1234567890',
    description: 'Experienced pet seller with a wide range of pets available for adoption.',
  };

  return (
    <div className="seller-details">
      <div className="seller-card">
        <div className="seller-image">
          <img src={sellerImage} alt="Seller" />
        </div>
        <div className="seller-info">
          <h2>{seller.name}</h2>
          <p><strong>Email:</strong> {seller.email}</p>
          <p><strong>Address:</strong> {seller.address}</p>
          <p><strong>Phone:</strong> {seller.phone}</p>
          <p><strong>Description:</strong> {seller.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
