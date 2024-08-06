import React from 'react';
import './Contact.css';

const ContactUs = () => {
  return (
    <div className="contact-us">
      <div className="contact-us-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Whether you have a question about our products, need assistance, or just want to talk about pets, we're here for you.</p>
      </div>
      <div className="contact-us-form-container">
        <form className="contact-us-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="contact-us-button">Send Message</button>
        </form>
      </div>
      <div className="contact-us-details">
        <div className="contact-us-info">
          <h2>Contact Information</h2>
          <p>Email: support@furryfinds.com</p>
          <p>Phone: +1 234 567 890</p>
          <p>Address: 123 Pet Street, Pet City, PC 12345</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
