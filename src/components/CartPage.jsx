import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart, setCartLength } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CartPage = () => {
  const [productDetails, setProductDetails] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);

  const handleQuantityChange = async (id, quantity) => {
    if (quantity > 0) {
      try {
        const varient = cartItems.find(item => item.varients[0]?.pvid === id)?.varients[0];
        if (varient) {
          const totalVarientPrice = varient.price * quantity;
          await axios.post(
            `https://api.bhartiyabiotech.com/cart/${userId}/${id}/${quantity}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              }
            }
          );
          dispatch(updateQuantity({ id, quantity }));
          fetchCartById(); // Fetch updated cart details after changing quantity
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const removeProductById = async (id) => {
    console.log("Removing item with id:", id);
    try {
      await axios.delete(
        `https://api.bhartiyabiotech.com/cart/${userId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success("Item removed from cart");
      dispatch(removeFromCart(id));
      fetchCartById(); // Fetch updated cart details after removing item
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleRemove = (id) => {
    removeProductById(id);
  };

  const getTotalPrice = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return 0; // or any default value you want
    }

    return cartItems.reduce((total, item) => {
      const price = item?.varients?.[0]?.price || 0; // Ensure item and item.price are defined
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalSavings = () => {
    if (!cartItems || cartItems.length === 0) {
      return 0; // or any default value you want
    }

    return cartItems
      .reduce((total, item) => {
        const originalPrice = item?.varients?.[0]?.price || 0;
        const discount = item?.varients?.[0]?.discount || 0;
        const discountedPrice = originalPrice - (originalPrice * discount) / 100;
        return total + (originalPrice - discountedPrice) * item.quantity;
      }, 0)
      .toFixed(2);
  };

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

      console.log(response, "cart response");
      fetchProductDetails(response.data.varient_quantity);
      dispatch(setCartLength(response.data.varient_quantity.length));
    } catch (error) {
      console.error("Error fetching cart by ID:", error);
    }
  };

  useEffect(() => {
    if (authToken && userId) {
      fetchCartById();
    }
  }, [authToken, userId]);

  const fetchProductDetails = async (cartItems) => {
    try {
      const productDetailsPromises = cartItems.map((item) =>
        axios.get(
          `https://api.bhartiyabiotech.com/productf/${item.productId}`
        )
      );
      const productDetailsResponses = await Promise.all(productDetailsPromises);
      const productDetails = productDetailsResponses.map(
        (response, index) => ({ ...response.data, quantity: cartItems[index].quantity })
      );
      setProductDetails(productDetails);
      console.log(productDetails, "product details");
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>
      {productDetails.length === 0 ? (
        <div className="text-center text-gray-600">Your cart is empty</div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lf flex-1 overflow-y-auto h-screen bg-white p-5">
            {productDetails.map((item) => (
              <div
                key={item.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col mb-4"
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {item.productName}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <span className="line-through">
                      ₹{item.varients?.[0]?.price}
                    </span>{" "}
                    <span className="text-green-600">
                      ₹
                      {(
                        item.varients?.[0]?.price -
                        (item.varients?.[0]?.price * item.varients?.[0]?.discount) /
                          100
                      ).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Discount: {item.varients?.[0]?.discount}%
                  </p>
                  <p className="text-gray-600 mt-2">
                    Size: {item.varients?.[0]?.size}
                  </p>
                  <p className="text-gray-600 mt-2">
                    Quantity: {item.quantity}
                  </p>
                </div>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleRemove(item.varients?.[0]?.pvid)}
                    type="button"
                    className="w-full bg-red-600 text-white font-semibold py-2 rounded-lg hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="rt bg-white shadow-lg rounded-lg p-6 text-center lg:sticky lg:top-4 lg:self-start">
            <h3 className="text-xl font-semibold text-gray-700">
              Order Summary
            </h3>
            <p className="text-gray-600">
              Subtotal:{" "}
              <span className="font-semibold">₹{getTotalPrice(cartItems)}</span>
            </p>
            <p className="text-gray-600">
              Shipping: <span className="font-semibold">Free</span>
            </p>
            <p className="text-gray-600">
              Taxes: <span className="font-semibold">₹0.00</span>
            </p>
            <p className="text-gray-600">
              You will save:{" "}
              <span className="font-semibold">₹{getTotalSavings()}</span>
            </p>
            <h3 className="text-2xl font-semibold text-gray-700">
              Total: ₹{(getTotalPrice(cartItems) - getTotalSavings()).toFixed(2)}
            </h3>
            <p className="text-gray-600 mt-2">
              Shipping and taxes calculated at checkout.
            </p>
            <button
              type="button"
              className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 mt-4"
            >
              <Link to="/checkout">Proceed to Checkout</Link>
            </button>
            <Link
              to="/productlist"
              className="text-green-500 font-semibold text-xl text-center rounded-lg hover:text-green-600 mt-4 inline-block p-2"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
