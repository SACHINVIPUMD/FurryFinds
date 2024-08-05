import React, { useContext } from 'react';
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext';
const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  return (
    <div className='productdisplay'>
      <div className='productdisplay-left'>
        <div className='productdisplay-img-list'>
          <img src={product.image} alt='' />
          <img src={product.image} alt='' />
          <img src={product.image} alt='' />
          <img src={product.image} alt='' />
        </div>
        <div className='productdisplay-img'>
          <img className='productdisplay-main-img' src={product.image} alt='' />
        </div>
      </div>
      <div className='productdisplay-right'>
        <h2>{product.name}</h2>
        <div className='productdisplay-right-stars'>
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_icon} alt='' />
          <img src={star_dull_icon} alt='' />
          <p>(122)</p>
        </div>
        <div className='productdisplay-right-prices'>
          <div className='productdisplay-right-price-old'>${product.old_price}</div>
          <div className='productdisplay-right-price-new'>${product.new_price}</div>
        </div>
        <div className='productdisplay-right-description'>
            {product.category === 'Pets' ? <>Meet our charming puppies! These affectionate and intelligent puppies are perfect for families and individuals alike </> :
             <>Explore our range of top-quality pet products! From cozy beds and interactive toys to nutritious food and stylish accessories, we have everything your furry friend needs to stay happy and healthy. </>}
        </div>
        <div className='productdisplay-right-size'>
          {product.category === 'Pets' ? <h1>Select Gender</h1> : <h1>Available Quantity</h1>}
          {product.category === 'Pets' ? <div className='productdisplay-right-sizes'>
            <div>Male</div>
            <div>Female</div>
          </div> : 
          <div className='productdisplay-right-sizes'>
          <div>1kg</div>
          <div>2kg</div>
          <div>3kg</div>
        </div>  }
        </div>
        {product.category === 'Pets' ? <button onClick={() => { addToCart(product.id) }}>View details</button>
         : <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>}
        
        <p className='productdisplay-right-category'><span>Category : </span>Pets , Breed</p>
        <p className='productdisplay-right-category'><span>Tags : </span> Healthy , Vaccinatd</p>
      </div>
    </div>
  )
}

export default ProductDisplay
