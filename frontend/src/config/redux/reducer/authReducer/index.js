import { createSlice } from "@reduxjs/toolkit";
import { loginAction, registerAction, logoutAction } from "../../action/authAction";

const initialState = {
    user: null,
    isLoading: false,
    error: null,
    token: null,
    isAuthenticated: false,
    message: ""
};

const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: () => initialState,
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = "";
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(loginAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.isAuthenticated = true;
            state.error = null;
            state.message = "Login successful";
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        });
        
        builder.addCase(registerAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(registerAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.isAuthenticated = true;
            state.error = null;
            state.message = "Registration successful";
        });
        builder.addCase(registerAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        });
        
        builder.addCase(logoutAction.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(logoutAction.fulfilled, (state) => {
            state.isLoading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.error = null;
            state.message = "Logout successful";
        });
        builder.addCase(logoutAction.rejected, (state) => {
            state.isLoading = false;
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        });
    }
});

export const { 
    reset, 
    clearError, 
    clearMessage,
    setAuthenticated
} = authReducer.actions;

export default authReducer.reducer;