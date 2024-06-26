import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: JSON.parse(localStorage.getItem("cartItems")) || [], // Load from Local Storage
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // Save to Local Storage
    },
    removeFromCart: (state, action) => {
      console.log("Removing item with id:", action.payload); // Debugging line
      state.items = state.items.filter(
        (item) => item.varients[0].pvid !== action.payload
      );
      console.log("Updated cart items:", state.items); // Debugging line
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // Save to Local Storage
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items)); // Save to Local Storage
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems"); // Remove from Local Storage
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
