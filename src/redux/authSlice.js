import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    userId: localStorage.getItem('userId') || null,
    token: localStorage.getItem('authToken') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        ...initialState,
        isAuthenticated: !!initialState.token,
    },
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.userId = null;
            state.token = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('userId');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
