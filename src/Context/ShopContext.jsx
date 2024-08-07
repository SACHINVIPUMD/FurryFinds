import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import all_product from '../Components/Assets/all_product';
import { AuthContext } from './AuthContext';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:8080/api/carts/${user.id}`)
        .then(response => {
          const fetchedCartItems = response.data.reduce((acc, item) => {
            acc[item.productId] = item.quantity;
            return acc;
          }, {});
          setCartItems(fetchedCartItems);
        })
        .catch(error => console.error('Error fetching cart data:', error));
    }
  }, [user]);

  const addToCart = async (itemId) => {
    if (!user) return; // Ensure user is logged in

    const newQuantity = (cartItems[itemId] || 0) + 1;
    setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

    const itemInfo = all_product.find((product) => product.id === itemId);

    try {
      await axios.post(`http://localhost:8080/api/carts/${user.id}/items`, {
        productId: itemId,
        productName: itemInfo.name,
        description: itemInfo.description,
        productPrice: itemInfo.new_price,
        quantity: newQuantity
      });
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) return; // Ensure user is logged in

    const newQuantity = cartItems[itemId] - 1;
    const itemInfo = all_product.find((product) => product.id === itemId);

    if (newQuantity <= 0) {
      setCartItems((prev) => {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      });

      try {
        await axios.delete(`http://localhost:8080/api/carts/items/${itemId}`);
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: newQuantity }));

      try {
        await axios.put(`http://localhost:8080/api/carts/${user.id}/items`, {
          productId: itemId,
          productName: itemInfo.name,
          description: itemInfo.description,
          productPrice: itemInfo.new_price,
          quantity: newQuantity
        });
      } catch (error) {
        console.error('Error updating item quantity in cart:', error);
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product.id === Number(item));
        totalAmount += cartItems[item] * itemInfo.new_price;
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
