import { createReducer } from "@reduxjs/toolkit";
import { loginSuccess, registerSuccess, logout, loadUserSuccess } from "../Actions/userActions";

const initialState = {
    isAuthenticated: false,
    isAdmin: false,
    userId: -1,
    email: undefined,
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(loginSuccess, (state, action) => {
            const { id, email, isAdmin } = action.payload;
            console.log(id, email, isAdmin);
            state.userId = id;
            state.email = email;
            state.isAuthenticated = true;
            state.isAdmin = isAdmin;
            state.error = undefined;
        })
        .addCase(registerSuccess, (state, action) => {
            state.user = action.payload;
        })
        .addCase(logout, (state, action) => {
            state.isAuthenticated = false;
            state.isAdmin = false;
            state.userId = -1;
            state.email = undefined;
        })
        .addCase(loadUserSuccess, (state, action) => {
            state.userId = action.payload.id;
            state.email = action.payload.email;
            state.isAuthenticated = true;
            state.isAdmin = action.payload.isAdmin;
            state.error = undefined;
        })
});
