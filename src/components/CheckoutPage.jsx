import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/cartSlice";
import { addAddress } from "../redux/addressSlice";
import { setOrderDetails } from "../redux/orderSlice";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const existingAddresses = useSelector((state) => state.address.addresses);
  const [token, setToken] = useState("");
  const dispatch = useDispatch();
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
    email: "",
  });

  const [selectedAddress, setSelectedAddress] = useState("");
  const [paymentType, setPaymentType] = useState("Online Payment");

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

      setCartData(response.data.varient_quantity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authToken && userId) {
      fetchCartById();
    }
  }, [authToken, userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handleSaveAddress = async () => {
    const addressPayload = {
      id: userId,
      name: shippingInfo.name,
      email: shippingInfo.email,
      mobile_number: shippingInfo.phone,
      colony: shippingInfo.address,
      city: shippingInfo.city,
      state: shippingInfo.state,
      pincode: shippingInfo.postalCode,
    };

    try {
      const response = await axios.post(
        `https://api.bhartiyabiotech.com/address/${userId}`,
        addressPayload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Address saved successfully!");
        dispatch(addAddress(addressPayload));
      } else {
        toast.error("Failed to save address.");
      }
    } catch (error) {
      toast.error("An error occurred while saving the address.");
      console.error("Error saving address:", error);
    }
  };

  const handleAddressSelect = (e) => {
    const selectedId = e.target.value;
    const selected = existingAddresses.find(
      (address) => address.id === parseInt(selectedId)
    );

    if (selected) {
      setShippingInfo({
        name: selected.name,
        address: selected.address.colony,
        city: selected.address.city,
        state: selected.address.state,
        postalCode: selected.address.pincode,
        country: "", // assuming this data is not available in existing address format
        phone: selected.mobile_number,
      });
    }
    setSelectedAddress(selectedId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cartData.length === 0) {
      toast.error("No items in the cart to place an order.");
      return;
    }
    const orderDetails = {
      customerid: userId,
      orderviacart: true,
      // varientid: cartData[0].varient_id,
      // quantity: cartData.length,
      billingAddress: shippingInfo.address,
      paymentType: paymentType,
    };
    try {
      const response = await axios.post(
        "https://api.bhartiyabiotech.com/order",
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.orderStatus === "PLACED") {
        toast.success("Order Placed successfully!");

        dispatch(
          setOrderDetails({
            cartItems,
            shippingInfo,
            total: getTotalPrice(),
            paymentMethod: paymentType,
            totalSavings: getTotalSavings(),
          })
        );

        dispatch(clearCart());
        navigate("/order-confirmation");
      } else {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTotalPrice = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems
      .reduce((total, item) => {
        if (item.varients && item.varients[0]) {
          const variant = item.varients[0];
          const itemTotal = variant.price * item.quantity;
          const itemDiscount = (variant.discount * itemTotal) / 100;
          return total + (itemTotal - itemDiscount);
        }
        return total;
      }, 0)
      .toFixed(2);
  };

  const getTotalSavings = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems
      .reduce((total, item) => {
        if (item.varients && item.varients[0]) {
          const variant = item.varients[0];
          const itemTotal = variant.price * item.quantity;
          const itemDiscount = (variant.discount * itemTotal) / 100;
          return total + itemDiscount;
        }
        return total;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Checkout
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Add Shipping Information
          </h3>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="bg-white shadow-lg rounded-lg p-6 mb-4"
          >
            {[
              "name",
              "address",
              "city",
              "state",
              "postalCode",
              "country",
              "phone",
              // "email",
            ].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-gray-700">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type="text"
                  name={field}
                  value={shippingInfo[field]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleSaveAddress}
              className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600"
            >
              Save Address
            </button>
          </form>
          {existingAddresses.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700">
                Use Existing Address
              </label>
              <select
                onChange={handleAddressSelect}
                className="w-full p-2 border rounded bg-white"
                value={selectedAddress}
              >
                <option value="">Select an address</option>
                {existingAddresses.map((address) => (
                  <option key={address.id} value={address.id}>
                    {address.address.colony}, {address.address.city},{" "}
                    {address.address.state}, {address.address.pincode}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h3>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-4">
            {(!cartItems || cartItems.length === 0) && (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
            <div className="mb-4">
              {cartItems &&
                cartItems.map((item, index) => {
                  const firstVariant =
                    item.varients && item.varients[0] ? item.varients[0] : {};

                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center mb-4"
                    >
                      <div className="flex items-center">
                        <img
                          src={firstVariant.image_url}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <h5 className="font-semibold text-gray-800">
                            {item.title}
                          </h5>
                          <p className="text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-gray-700">
                          ₹{(firstVariant.price * item.quantity).toFixed(2)}
                        </span>
                        <span className="block text-green-500">
                          ₹
                          {(
                            ((firstVariant.discount * item.quantity).toFixed(
                              2
                            ) *
                              (firstVariant.price * item.quantity).toFixed(2)) /
                            100
                          ).toFixed(2)}
                        </span>
                        <span className="block ">
                          ₹
                          {(
                            (firstVariant.price * item.quantity).toFixed(2) -
                            ((firstVariant.discount * item.quantity).toFixed(
                              2
                            ) *
                              (firstVariant.price * item.quantity).toFixed(2)) /
                              100
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="flex justify-between text-lg font-semibold text-gray-700">
              <span>Total:</span>
              <span>₹{getTotalPrice()}</span>
            </div>

            <div className="flex justify-between text-lg font-semibold text-green-500">
              <span>You Save:</span>
              <span>₹{getTotalSavings()}</span>
            </div>
            <div className="mb-4 mt-4">
              <label className="block text-gray-700">Payment Type</label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value)}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="Online Payment">Online Payment</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 mt-4"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CheckoutPage;
