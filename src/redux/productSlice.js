import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    filteredProducts: [],  // Add this line
    singleProduct: null,
    showbox: false
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload
            state.filteredProducts = action.payload // Add this line to initialize filteredProducts
        },
        setSingleProduct: (state, action) => {
            state.singleProduct = action.payload
        },
        setFilteredProducts: (state, action) => { // Add this reducer
            state.filteredProducts = action.payload
        },
        setShowbox: (state, action) => {
            state.showbox = action.payload
            console.log(state.showbox)
        }
    }
})

export const { setProducts, setSingleProduct, setFilteredProducts, setShowbox } = productSlice.actions

export default productSlice.reducer
