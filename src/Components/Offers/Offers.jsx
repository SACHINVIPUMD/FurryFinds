import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_img.png'
import { Link } from 'react-scroll'
const Offers = () => {
  return (
    <div className="offers">
   <div className="offers-left">
   <h1>Exclusive</h1>
   <h1>Offers For You</h1>
   <p>ONLY ON BEST SELLERS PRODUCTS</p>
      <Link
            to="new-arrival"
            smooth={true}
            duration={500}
            className="hero-latest-btn">
            <div className='check-now'>
              Check Now
            </div>
        </Link>
   </div>
   <div className="offers-right">
    <img src={exclusive_image} alt="" width='65%'  />
   </div>
    </div>
  )
}
 
export default Offers