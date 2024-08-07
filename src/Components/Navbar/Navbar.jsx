import React, { useState, useRef, useContext, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo (3).png';
import cart_icon from '../Assets/cart_icon.png';
import dropdown_icon from "../Assets/dropdown_icon.png";
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { AuthContext } from '../../Context/AuthContext';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);
  const { user, logout } = useContext(AuthContext);
  const menuRef = useRef();

  useEffect(() => {
    // This effect will run when 'user' changes
    console.log('User state changed:', user);
  }, [user]);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <div className='logo'>
          <img src={logo} alt=""/>
        </div>
        <p>FurryFinds</p>
      </div>
      <img className="nav-dropdown" onClick={dropdown_toggle} src={dropdown_icon} alt="" />
      <ul ref={menuRef} className='nav-menu'>
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("pets") }}><Link style={{ textDecoration: 'none' }} to='/pets'>Pets</Link>{menu === "pets" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("foods") }}><Link style={{ textDecoration: 'none' }} to='/foods'>Foods</Link>{menu === "foods" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("products") }}><Link style={{ textDecoration: 'none' }} to='/products'>Products</Link>{menu === "products" ? <hr /> : <></>}</li>
      </ul>
      <div className='nav-login-card'>
        {user ? (
          <>
            <span>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to='/login'><button>Login</button></Link>
        )}
        <Link to='/cart'><img src={cart_icon} alt=""/></Link>
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
