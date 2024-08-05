import React from 'react';
import './DescriptionBox.css';
const DescriptionBox = () => {
  return (
    <div className='descriptionbox'>
      <div className='descriptionbox-navigator'>
        <div className='descriptionbox-nav-box'>Description</div>
        <div className='descriptionbox-nav-box fade'>Reviews (122)</div>
      </div>
      <div className='descriptionbox-description'>
        <p>Meet our charming  puppies! These affectionate and intelligent puppies are perfect for families and individuals alike. Raised in a loving environment, they are well-socialized, healthy, and ready to find their forever homes. Each puppy comes with up-to-date vaccinations, deworming, and a health guarantee.</p>
        <p>
        A comprehensive online platform designed for the sale and adoption of pets. This platform connects pet seekers with pet owners and breeders, providing a seamless and user-friendly experience to ensure pets find loving homes.        </p>
      </div>
    </div>
  )
}

export default DescriptionBox;
