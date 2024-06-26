import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Orders = () => {
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `https://api.bhartiyabiotech.com/order/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data, " order response ");
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      }
      setError("Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchOrders();
    }
  }, [authToken]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto my-10 p-5 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-5">Orders</h1>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.orderId} className="p-4 border rounded-lg bg-gray-50 shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Order ID: {order.orderId}</h2>
              <p className="text-gray-700"><span className="font-medium">Product Name:</span> {order.orderedProduct[0].productName}</p>
              <p className="text-gray-700"><span className="font-medium">Quantity:</span> {order.orderedProduct[0].quantity}</p>
              <p className="text-gray-700"><span className="font-medium">Total Amount:</span> {order.totalAmount}</p>
              <p className="text-gray-700"><span className="font-medium">Order Status:</span> {order.orderStatus}</p>
              <p className="text-gray-700"><span className="font-medium">Order Date:</span> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p className="text-gray-700"><span className="font-medium">Shipping Address:</span> {order.shippingAddress}</p>
              <p className="text-gray-700"><span className="font-medium">Billing Address:</span> {order.billingAddress}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600">No orders found</div>
      )}
    </div>
  );
};

export default Orders;
