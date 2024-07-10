import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, setCartLength } from '../redux/cartSlice';
import { setSingleProduct } from '../redux/productSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { productId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  console.log(quantity);
  const products = useSelector((state) => state.product.singleProduct);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [stock, setStock] = useState(true);

  const userId = useSelector((state) => state.auth.userId);
  const authToken = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://api.bhartiyabiotech.com/productf/${productId}`
        );
        dispatch(setSingleProduct(response.data));
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching the product');
        console.error('Error fetching the product:', err);
      } finally {
        setLoading(false);
      }
    };
    if (productId) {
      fetchProduct();
    } else {
      setError('Invalid product ID');
      setLoading(false);
    }
  }, [productId, dispatch]);

  const handleAddToCart = async () => {
    try {
      const variantId = product.varients[0].pvid;
      const variantPrice = product.varients[0].price;

      const response = await axios.post(
        `https://api.bhartiyabiotech.com/cart/${userId}/${variantId}/${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 201) {
        dispatch(addToCart({ ...product, quantity }));

        // Fetch updated cart length
        const cartResponse = await axios.get(
          `https://api.bhartiyabiotech.com/cart/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        dispatch(setCartLength(cartResponse.data.varient_quantity.length));

        toast.success('Product added to cart', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Unauthorized: Please log in again');
      } else {
        setError('Error adding product to cart');
      }
      console.error('Error adding product to cart:', error);
      toast.error('Error adding product to cart', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  };


  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-8 h-8 bg-green-500 rounded-full"></div>
          <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-8 bg-yellow-500 rounded-full"></div>
        </div>
        <div className="text-center mt-4 text-gray-600 text-lg font-semibold animate-bounce">
          Loading...
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Something Went Wrong</h1>
      <p className="text-lg text-gray-700 mb-8">{error  || "An unexpected error occurred."}</p>
    </div>;
  }

  const variant = product.varients[0];
  const discountedPrice =
    variant.price - (variant.price * variant.discount) / 100;

  return (
    <div className=" md:flex items-center md:justify-around md:min-h-screen w-full md:px-4 bg-gray-100 ">
      <div className="flex items-center justify-center md:border-r border-gray-800 md:w-[40%] h-96 md:h-screen">
        <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-md sticky object-cover overflow-hidden mx-auto hover:scale-110 transition-all">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover hover:scale"
          />
        </div>
      </div>
      <div className="px-5 py-6 md:px-20 text-center flex-1 items-center bg-gray-100">
        <h3 className="text-3xl font-semibold text-black tracking-tighter">
          {product.productName}
        </h3>
        <h4 className="text-xl text-gray-600 font-bold mt-2">
          <span className="line-through">Rs. {variant.price}</span>{' '}
          <span className="text-green-600">
            Rs. {discountedPrice.toFixed(2)}
          </span>
        </h4>
        <p>Discount: {variant.discount}%</p>
        <h4 className="text-xl text-gray-600 font-bold mt-2">
          {product.category}
        </h4>
        <p className="text-green-600 font-semibold mt-3">
          Stock: {stock ? 'Available' : 'Out of Stock'}
        </p>
        <p className="text-gray-600 font-semibold mt-3">
          Size: {variant.size}
        </p>
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleDecrement}
            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
            disabled={quantity <= 1}
          >
            -
          </button>
          <span className="px-4 py-2">{quantity}</span>
          <button
            onClick={handleIncrement}
            className="px-4 py-2 bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <div className='flex w-[100%] gap-6 md:items-center justify-center '>
          <Link to={`/singlecheckout/${product.productId}`}
            type="button"
            className="bg-green-600  font-semibold hover:bg-gray-700 rounded-md text-white text-sm px-2 py-2 md:py-2.5 w-[25%] mt-6"
          >
            Buy Now
          </Link>
          <button
            onClick={handleAddToCart}
            type="button"
            className="bg-red-500 font-semibold hover:bg-gray-700 text-white border border-gray-800 text-base rounded-lg text-sm px-2 py-2.5 w-[35%] mt-6"
          >
            Add to Cart
          </button>

        </div>
        <p className="text-gray-600 font-semibold mt-3 md:mt-8 tracking-normal md:border-t-2 border-gray-800 md:py-6">
          {product.description}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
