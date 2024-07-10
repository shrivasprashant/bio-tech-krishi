import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import cartReducer from './cartSlice';
import addressReducer from './addressSlice';
import orderReducer from './orderSlice';
import authReducer from './authSlice';
import categoryReducer from './categorySlice'; // Import the new slice

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer, 
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer,
    category: categoryReducer, // Add the new slice to the store
  },
})

export default store
