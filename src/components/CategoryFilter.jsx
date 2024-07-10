import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryFilter = () => {
    const { category } = useParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://api.bhartiyabiotech.com/products');
                const filteredProducts = response.data.filter(product => product.category === category);
                setProducts(filteredProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [category]);

    const calculateDiscountedPrice = (price, discount) => {
        return price - (price * discount / 100);
    };
    

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 text-center capitalize">{category} Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <Link to={`/product/${product.productId}`} key={product.productId} className="group">
                        <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{product.productName}</h2>
                                <p className="text-gray-600 mb-2">Category: {product.category}</p>
                                {product.varients.map((varient, index) => (
                                    <div key={index} className="mb-4">
                                        <p className="text-gray-600">Size: {varient.size}</p>
                                        <div className="flex items-center">
                                            <p className="text-gray-600 line-through mr-2">Rs. {varient.price}</p>
                                            <p className="text-xl font-bold text-green-600">Rs. {calculateDiscountedPrice(varient.price, varient.discount)}</p>
                                        </div>
                                        <p className="text-gray-600">Discount: {varient.discount}%</p>
                                        {/* <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300">
                                            Offer {varient.discount}% Off
                                        </button> */}
                                    </div>
                                ))}

                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CategoryFilter;
