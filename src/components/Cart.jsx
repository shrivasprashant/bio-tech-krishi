// Cart.js
import React, { useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setCartLength } from '../redux/cartSlice';

const Cart = () => {
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);
  const cartLength = useSelector((state) => state.cart.cartLength);
  const dispatch = useDispatch();

  const fetchCartById = async () => {
    try {
      const response = await axios.get(
        `https://api.bhartiyabiotech.com/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      dispatch(setCartLength(response.data.varient_quantity.length));
      console.log(response.data.varient_quantity.length, 'cart length');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken && userId) {
      fetchCartById();
    }
  }, [authToken, userId]);

  return (
    <div className="cart">
      <Link className="flex items-center" to="/cart">
        <span className="cart-icon">
          <FaShoppingCart />
        </span>
        <span className="cart-count mt-[-15px]">{cartLength}</span>
      </Link>
    </div>
  );
};

export default Cart;
