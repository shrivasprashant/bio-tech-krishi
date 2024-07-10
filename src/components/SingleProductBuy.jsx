import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const SingleProductBuy = () => {
  const { id } = useParams();
  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://api.bhartiyabiotech.com/productf/${id}`);
        setProduct(response.data);
        console.log(response.data);
        if (response.data.varients && response.data.varients.length > 0) {
          setSelectedVariant(response.data.varients[0]);
        }
      } catch (err) {
        setError('Error fetching the product');
        console.error('Error fetching the product:', err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    } else {
      setError('Invalid product ID');
      setLoading(false);
    }
  }, [id]);

  const [address, setAddress] = useState({
    colony: '',
    city: '',
    state: '',
    pincode: ''
  });

  const [quantity, setQuantity] = useState(1);
  const [paymentType, setPaymentType] = useState('Cash On Delivery');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value
    });
  };

  const handleSaveAddress = async () => {
    const addressPayload = {
      id: userId,
      ...address
    };

    try {
      const response = await axios.post(
        `https://api.bhartiyabiotech.com/address/${userId}`,
        addressPayload,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.status === 201) {
        toast.success('Address saved successfully!');
      } else {
        toast.error('Failed to save address.');
      }
    } catch (error) {
      toast.error('An error occurred while saving the address.');
      console.error('Error saving address:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const variantId = selectedVariant.pvid;
    const orderDetails = {
      customerid: userId,
      orderviacart: false,
      varientid: variantId,
      quantity: quantity,
      paymentType: paymentType
    };
    try {
      const response = await axios.post(
        'https://api.bhartiyabiotech.com/order',
        orderDetails,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.orderStatus === 'PLACED') {
        toast.success('Order Placed successfully!');

        const orderSummary = {
          productName: product.productName,
          size: selectedVariant.size,
          price: selectedVariant.price,
          discount: selectedVariant.discount,
          quantity,
          totalPrice: ((selectedVariant.price - (selectedVariant.price * (selectedVariant.discount / 100))) * quantity).toFixed(2),
          totalSavings: ((selectedVariant.price * quantity) - ((selectedVariant.price - (selectedVariant.price * (selectedVariant.discount / 100))) * quantity)).toFixed(2)
        };

        navigate('/SingleOrderConfirmation', { state: { orderSummary, address } });
      } else {
        toast.error('Failed to place order.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const {
    category,
    description,
    imageUrl,
    productName,
    varients
  } = product;

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4">
      {/* Product Details */}
      <div className="bg-white shadow-md p-4 rounded-md w-full lg:w-1/2">
        <h1 className="text-2xl font-bold mb-4">{productName}</h1>
        <img src={imageUrl} alt={productName} className="w-full h-auto mb-4" />
        <p><strong>Category:</strong> {category}</p>
        {/* <p><strong>Description:</strong> {description}</p> */}

        <div className="mt-4">
          <label className="block mb-1">Variants</label>
          <select
            value={selectedVariant ? selectedVariant.pvid : ''}
            onChange={(e) => {
              const selectedVar = varients.find(v => v.pvid === parseInt(e.target.value));
              setSelectedVariant(selectedVar);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {varients.map(variant => (
              <option key={variant.pvid} value={variant.pvid}>
                {variant.size} - ${variant.price} ({variant.discount}% off)
              </option>
            ))}
          </select>
        </div>

        {selectedVariant && (
          <div className="product-variant mt-4">
            <p><strong>Size:</strong> {selectedVariant.size}</p>
            <p>
              <strong>Price:</strong>
              <span className="line-through mr-2">{selectedVariant.price.toFixed(2)}</span>
              <span className="text-green-500">
                Rs. {(selectedVariant.price - (selectedVariant.price * (selectedVariant.discount / 100))).toFixed(2)}
              </span>
            </p>
            <p><strong>Discount:</strong> {selectedVariant.discount}%</p>
          </div>
        )}

        <div className="mt-4">
          <label className="block mb-1">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1">Payment Type</label>
          <input
            type="text"
            disabled
            name="paymentType"
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white p-2 rounded-md mt-4"
        >
          Place Order
        </button>
      </div>

      {/* Address Details */}
      <div className="bg-white shadow-md p-4 rounded-md w-full lg:w-1/2">
        <h2 className="text-xl font-bold mb-2">Address Details</h2>
        <div className="mb-2">
          <label className="block mb-1">Colony</label>
          <input
            type="text"
            name="colony"
            value={address.colony}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">City</label>
          <input
            type="text"
            name="city"
            value={address.city}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">State</label>
          <input
            type="text"
            name="state"
            value={address.state}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleSaveAddress}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Save Address
        </button>
        {/* Order Summary */}
        {selectedVariant && (
          <div className="bg-gray-100 p-4 rounded-md mt-4">
            <h2 className="text-xl font-bold mb-2">Order Summary</h2>
            <p><strong>Product:</strong> {productName}</p>
            <p><strong>Size:</strong> {selectedVariant.size}</p>
            <p>
              <strong>Price:</strong>
              <span className="line-through mr-2">{selectedVariant.price.toFixed(2)}</span>
              <span className="text-green-500">
                Rs. {(selectedVariant.price - (selectedVariant.price * (selectedVariant.discount / 100))).toFixed(2)}
              </span>
            </p>
            <p><strong>Discount:</strong> {selectedVariant.discount}%</p>
            <p><strong>Quantity:</strong> {quantity}</p>
            <p>
              <strong>Total Savings:</strong>
              {((selectedVariant.price * quantity) - ((selectedVariant.price - (selectedVariant.price * (selectedVariant.discount / 100))) * quantity)).toFixed(2)}
            </p>
            <p>
              <strong>Total Price:</strong>
              {((selectedVariant.price - (selectedVariant.price * (selectedVariant.discount / 100))) * quantity).toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductBuy;
