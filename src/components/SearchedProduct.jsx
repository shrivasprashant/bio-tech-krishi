import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setShowbox } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

const SearchedProduct = () => {
    const dispatch = useDispatch();
    const handaleclose = () => {
        dispatch(setShowbox(false))
    }
    const showbox = useSelector((state) => state.product.showbox);
    const filteredProducts = useSelector((state) => state.product.filteredProducts);
    return (
        <div className={`${showbox ? 'block' : 'hidden'} container flex items-center justify-center w-24 md:w-96 mx-auto absolute top-20 left-40 md:top-[16.8%] md:left-[10.7%] z-50 p-5  bg-white`}>

            <div className="grid grid-cols-1">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-center p-1">
                                {/* <img src={product.imageUrl} alt={""} className="w-10 h-10 object-cover rounded-full" /> */}
                                <Link onClick={handaleclose} to={`/product/${product.productId}`} className="text-sm font-bold">{product.productName}</Link>
                                {/* <h2 className="text-sm font-bold">{product.productName}</h2> */}
                            </div>
                        ))}
                    </div>
                ) : (
                    handaleclose()
                )}
            </div>
        </div>
    )
}

export default SearchedProduct

