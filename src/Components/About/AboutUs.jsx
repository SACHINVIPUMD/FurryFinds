import React from 'react';
import './AboutUs.css';
import teamPhoto from '../Assets/team_image.jpg'; // Make sure to add a team photo
import missionIcon from '../Assets/mission_icon.png';
import visionIcon from '../Assets/vision_icon.png';
import valuesIcon from '../Assets/value_icon.png';

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="hero-section">
        <h1>About Us</h1>
        <p>Get to know the people behind FurryFinds</p>
      </div>
      <div className="content-section">
        <div className="section">
          <h2>Our Mission</h2>
          <img src={missionIcon} alt="Mission Icon" />
          <p>Our mission is to connect pet lovers with their perfect furry companions, ensuring a joyful and fulfilling experience for both pets and owners.</p>
        </div>
        <div className="section">
          <h2>Our Vision</h2>
          <img src={visionIcon} alt="Vision Icon" />
          <p>We envision a world where every pet finds a loving home and every owner finds their perfect match, fostering a harmonious and happy community of pet lovers.</p>
        </div>
        <div className="section">
          <h2>Our Values</h2>
          <img src={valuesIcon} alt="Values Icon" />
          <p>We are committed to transparency, trust, and empathy in all our interactions, ensuring the highest standards of care and support for pets and their owners.</p>
        </div>
      </div>
      <div className="team-section">
        <h2>Meet Our Team</h2>
        <img src={teamPhoto} alt="Team" />
        <p>Our dedicated team of animal lovers is here to help you every step of the way.</p>
      </div>
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions or need support? Reach out to us at <a href="mailto:support@furryfinds.com">support@furryfinds.com</a>.</p>
      </div>
    </div>
  );
};

export default AboutUs;
