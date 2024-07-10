import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { Link } from "react-router-dom";

const HomeProduct = () => {
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.bhartiyabiotech.com/products"
        );
        console.log(response.data, "products");
        dispatch(setProducts(response.data));
      } catch (err) {
        setError("Error fetching the products");
        console.error("Error fetching the products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

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
    return <div>{error}</div>;
  }

  if (!products || products.length === 0) {
    return <div>No products available.</div>;
  }

  const applyDiscount = (price, discount) => {
    return (price - (price * discount) / 100).toFixed(2);
  };

  return (
    <div>
      <div className="font-sans">
        <div className="p-4 mx-auto xl:max-w-7xl lg:max-w-5xl md:max-w-3xl max-w-lg">
          <h2 className="text-4xl bg-green-600 font-extrabold text-gray-100 text-center mb-16">
            New Arrival 🌱
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ">
            {products.map((product) => (
              <Link
                to={`/product/${product.productId}`}
                key={product.productId}
                className="bg-transparent rounded-md  p-1 overflow-hidden cursor-pointer "
              >
                <div className="bg-white flex flex-col h-full">
                  <div className="w-full h-[250px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-full w-full object-cover rounded-md"
                    />
                  </div>
                  <div className="p-6  text-center flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.productName}
                    </h3>
                    <h3 className="text-lg font-semibold text-gray-600">
                      {product.category}
                    </h3>
                    <div className="flex justify-center items-center">
                      <span className="text-xl text-gray-500 font-bold mr-2 line-through">
                      ₹ {product.varients[0].price}
                      </span>
                      <span className="text-xl text-green-600 font-bold">
                      ₹ {applyDiscount(product.varients[0].price, product.varients[0].discount)}
                      </span>
                      
                    </div>
                    <div className="py-2 border bg-gray-300 mt-2">
                      <Link
                        to={`/singlecheckout/${product.productId}`}
                        className="ml-4 bg-white hover:text-white hover:bg-green-600   px-4 py-2 rounded tracking-tighter"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeProduct;
