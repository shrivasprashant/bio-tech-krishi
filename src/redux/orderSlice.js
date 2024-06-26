import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
    name: 'order',
    initialState: {
        orderDetails: null,
    },
    reducers: {
        setOrderDetails: (state, action) => {
            state.orderDetails = action.payload;
        },
        clearOrderDetails: (state) => {
            state.orderDetails = null;
        },
    },
});

export const { setOrderDetails, clearOrderDetails } = orderSlice.actions;

export default orderSlice.reducer;
