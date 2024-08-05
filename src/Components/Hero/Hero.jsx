import React from 'react';
import './Hero.css';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero.png';
import handwave from '../Assets/handwave.gif';
import { Link } from 'react-scroll';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-left">
        <div>
          <div className="hero-hand-icon">
            <h2>Welcome to Furry Finds</h2>
            <img src={handwave} alt='' className='gi'/>
          </div>
          <p>One-stop for finding perfect pet!</p>
        </div>
        <Link
          to="popular-section"
          smooth={true}
          duration={500}
          className="hero-latest-btn"
        >
          <div className='explore'>Explore</div>
          <img src={arrow_icon} alt=''/>
        </Link>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt='model' height='100%' width='70%'/>
      </div>
    </div>
  );
}

export default Hero;
