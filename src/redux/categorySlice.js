import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    selectedCategory: '',
    filteredProducts: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.selectedCategory = action.payload
        },
        setFilteredCategoryProducts: (state, action) => {
            state.filteredProducts = action.payload
        }
    }
})

export const { setCategory, setFilteredCategoryProducts } = categorySlice.actions

export default categorySlice.reducer
