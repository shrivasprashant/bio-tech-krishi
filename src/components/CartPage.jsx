import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity, removeFromCart } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CartPage = () => {
  const [productDetails, setProductDetails] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [cartLength, setCartLength] = useState(0);

  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const revomeProductById = async (id) => {
    console.log("Removing item with id:", id);
    try {
      const response = await axios.delete(
        `https://api.bhartiyabiotech.com/cart/${userId}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      fetchCart();
      toast.success("Item removed from carttttt");

      const { data } = response;
      console.log(data.data, "dddddddddd");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = (id) => {
    revomeProductById(id);
    dispatch(removeFromCart(id));
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce(
        (total, item) => total + item.varients[0].price * item.quantity,
        0
      )
      .toFixed(2);
  };

  const getTotalSavings = () => {
    return cartItems
      .reduce((total, item) => {
        const originalPrice = item.varients[0].price;
        const discountedPrice =
          originalPrice - (originalPrice * item.varients[0].discount) / 100;
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
      setCartLength(response.data.varient_quantity.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartById();
  }, [authToken]);

  const fetchProductDetails = async (cartItems) => {
    try {
      const productDetailsPromises = cartItems.map((item) =>
        axios.get(
          `https://api.bhartiyabiotech.com/productf/${item.productId}`
        )
      );
      const productDetailsResponses = await Promise.all(productDetailsPromises);
      const productDetails = productDetailsResponses.map(
        (response) => response.data
      );
      setProductDetails(productDetails);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 bg-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h2>
      {productDetails?.length === 0 ? (
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
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mt-2">
                    <span className="line-through">
                      ₹{item.varients[0].price}
                    </span>{" "}
                    <span className="text-green-600">
                      ₹
                      {(
                        item.varients[0].price -
                        (item.varients[0].price * item.varients[0].discount) /
                          100
                      ).toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-600 mt-2">
                    Discount: {item.varients[0].discount}%
                  </p>
                  <div className="flex items-center mt-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity - 1)
                      }
                      className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-l-lg"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-2 border-t border-b border-gray-200">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.id, item.quantity + 1)
                      }
                      className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <button
                    onClick={() => handleRemove(item.varients[0].pvid)}
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
              <span className="font-semibold">₹{getTotalPrice()}</span>
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
              Total: ₹{getTotalPrice()-getTotalSavings()}
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
