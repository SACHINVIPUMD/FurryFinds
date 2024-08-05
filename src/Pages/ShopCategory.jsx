import React, { useContext, useState } from 'react';
import './CSS/ShopCategory.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../Components/Item/Item';
import Search from '../Components/Search/Search';
import noProductsImg from '../Components/Assets/no_matches.png';
import { useNavigate } from 'react-router-dom';

const ShopCategory = (props) => {
  const navigate = useNavigate();
  const { all_product } = useContext(ShopContext);
  const [searchVal, setSearchVal] = useState("");
  const [visibleProducts, setVisibleProducts] = useState(10); // Initial number of products to display

  const handleSearch = () => {
    const filteredProducts = all_product.filter((item) => {
      return (
        item.category === props.category &&
        item.name.toLowerCase().includes(searchVal.toLowerCase())
      );
    });

    if (filteredProducts.length === 0) {
      navigate('/no-items');
    }

    return filteredProducts;
  };

  const handleLoadMore = () => {
    setVisibleProducts(prevVisibleProducts => prevVisibleProducts + 10);
  };

  const filteredProducts = handleSearch();

  return (
    <div className='shop-category'>
      <img className='shopcategory-banner' src={props.banner} alt=''/>
      <div className='shopcategory-indexSort'>
        <Search searchVal={searchVal} setSearchVal={setSearchVal} handleSearch={handleSearch} />
      </div>
      <div className='shopcategory-products'>
        {filteredProducts.length > 0 ? (
          filteredProducts.slice(0, visibleProducts).map((item, i) => (
            <Item 
              key={i} 
              id={item.id} 
              name={item.name}
              description={item.description} 
              image={item.image} 
              new_price={item.new_price} 
              old_price={item.old_price}
            />
          ))
        ) : (
          <div className='no-products'>
            <img src={noProductsImg} alt="No products found" />
          </div>
        )}
      </div>

      {filteredProducts.length > visibleProducts && (
        <div className='shopcategory-loadmore'>
          <button className='' onClick={handleLoadMore}>
            Explore More
          </button>
        </div>
      )}
    </div>
  );
}

export default ShopCategory;
