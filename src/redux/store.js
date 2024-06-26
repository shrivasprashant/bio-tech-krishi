import { configureStore } from '@reduxjs/toolkit'
import productReducer from './productSlice'
import cartReducer from './cartSlice';
import addressReducer from './addressSlice';
import orderReducer from './orderSlice';
import authReducer from './authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer, 
    cart: cartReducer,
    address: addressReducer,
    order: orderReducer
  },
})

export default store