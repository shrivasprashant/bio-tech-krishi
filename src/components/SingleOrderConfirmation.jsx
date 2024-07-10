import React from 'react';
import { useLocation } from 'react-router-dom';
import log from "../components/images/logo.png";

const SingleOrderConfirmation = () => {
  const location = useLocation();
  const { orderSummary, address } = location.state;

  return (
    <div className="p-4">
      <div className="bg-white shadow-md p-4 rounded-md max-w-2xl mx-auto">
        {/* Logo */}
        <div className="text-center  mb-4">
          <img src={log} alt="Company Logo" className="h-16 mx-auto object-cover" />
        </div>

        <h1 className="text-2xl font-bold mb-4">Order Confirmation</h1>
        
        {/* Address Details */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping Address</h2>
          <p><strong>Colony:</strong> {address.colony}</p>
          <p><strong>City:</strong> {address.city}</p>
          <p><strong>State:</strong> {address.state}</p>
          <p><strong>Pincode:</strong> {address.pincode}</p>
        </div>

        {/* Order Summary */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
          <p><strong>Product:</strong> {orderSummary.productName}</p>
          <p><strong>Size:</strong> {orderSummary.size}</p>
          <p><strong>Price after Discount:</strong> {orderSummary.price.toFixed(2)}</p>
          <p><strong>Quantity:</strong> {orderSummary.quantity}</p>
          <p><strong>Total Savings:</strong> {orderSummary.totalSavings.toFixed(2)}</p>
          <p><strong>Total Price:</strong> {orderSummary.totalPrice.toFixed(2)}</p>
        </div>

        <div className="text-center">
          <button
            className="bg-green-500 text-white p-2 rounded-md"
            onClick={() => window.location.href = '/'} // Redirect to homepage or another page
          >
            Continue Shopping
          </button>
          <button 
            onClick={() => window.print()} 
            className="bg-blue-500 text-white p-2 rounded-md ml-2"
          >
            Print
          </button>
        </div>

        {/* Tagline and Thank You */}
        <div className="text-center mt-4">
          <p className="text-lg font-extrabold">Thank you for your order!</p>
          <p className="text-sm text-gray-800 font-semibold">We hope to see you again soon. Have a great day!</p>
        </div>
      </div>
    </div>
  );
}

export default SingleOrderConfirmation;
