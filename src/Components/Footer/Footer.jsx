import React from 'react';
import './Footer.css';
import footer_logo from '../Assets/logo_big.png';
import { FaInstagram, FaPinterest, FaWhatsapp, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='footer-top'>
        <div className='footer-logo'>
          <img src={footer_logo} alt='Furry Finds Logo'/>
          <p>Furry Finds</p>
        </div>
        <ul className='footer-links'>
          <li><a href='/'>Company</a></li>
          <li><a href='/pets'>Products</a></li>
          <li><a href='/seller'>Dealers</a></li>
          <li><a href='/about'>About</a></li>
          <li><a href='/contact'>Contact</a></li>
        </ul>
        <div className='footer-social-icon'>
          <a href='https://instagram.com' className='footer-icon'><FaInstagram /></a>
          <a href='https://pinterest.com' className='footer-icon'><FaPinterest /></a>
          <a href='https://whatsapp.com' className='footer-icon'><FaWhatsapp /></a>
          <a href='https://facebook.com' className='footer-icon'><FaFacebook /></a>
          <a href='https://twitter.com' className='footer-icon'><FaTwitter /></a>
          <a href='https://linkedin.com' className='footer-icon'><FaLinkedin /></a>
        </div>
      </div>
      <div className='footer-bottom'>
        <div className='footer-help'>
          <h3>Help & Support</h3>
          <ul>
            <li><a href='/faq'>FAQ</a></li>
            <li><a href='/returns'>Returns</a></li>
            <li><a href='/shipping'>Shipping Info</a></li>
            <li><a href='/contact'>Contact Us</a></li>
          </ul>
        </div>
        <div className='footer-info'>
          <h3>Information</h3>
          <ul>
            <li><a href='/privacy-policy'>Privacy Policy</a></li>
            <li><a href='/terms-of-service'>Terms of Service</a></li>
            <li><a href='/cookie-policy'>Cookie Policy</a></li>
          </ul>
        </div>
        <div className='footer-newsletter'>
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type='email' placeholder='Enter your email address' />
            <button type='submit'>Subscribe</button>
          </form>
        </div>
      </div>
      <div className='footer-copyright'>
        <hr/>
        <p>Copyright @ 2024 - All Rights Reserved.</p>
      </div>
    </div>
  )
}

export default Footer;
