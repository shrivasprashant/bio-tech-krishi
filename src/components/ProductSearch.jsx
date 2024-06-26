import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilteredProducts } from '../redux/productSlice';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {setShowbox} from '../redux/productSlice'

const ProductSearch = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (e) => {
        dispatch(setShowbox(true))
        const query = e.target.value;
        setSearchQuery(query);

        if (query.trim()) {
            const filteredProducts = products.filter(product =>
                product.productName.toLowerCase().includes(query.toLowerCase())
            );
            dispatch(setFilteredProducts(filteredProducts));
        } else {
            dispatch(setFilteredProducts([]));
        }
    };

    return (
        <div className="mb-5">
            <form className='flex items-center gap-2'>
                <input
                    type="text"
                    className='border hidden md:block rounded-sm px-4 py-2 md:w-40 lg:w-96'
                    placeholder="Search product..."
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                <button type="button" className='hidden md:block bg-green-600 text-white px-4 py-2 rounded-sm hover:bg-green-700 transition'>
                    <FaSearch />
                </button>
            </form>
        </div>
    );
};

export default ProductSearch;
 