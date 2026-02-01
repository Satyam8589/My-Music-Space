import { createSlice } from "@reduxjs/toolkit";
import { loginAction, registerAction, logoutAction, googleAuthCallback } from "../../action/authAction";

const initialState = {
    user: null,
    isLoading: true, // Start in loading state to check token
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
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = "";
        },
        setAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
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

        // Google Auth
        builder.addCase(googleAuthCallback.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(googleAuthCallback.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.isAuthenticated = true;
            state.error = null;
            state.message = "Google authentication successful";
        });
        builder.addCase(googleAuthCallback.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        });

        // External User Profile Action
        builder.addCase("user/getProfile/pending", (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase("user/getProfile/fulfilled", (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        });
        builder.addCase("user/getProfile/rejected", (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.token = null;
        });
    }
});

export const { 
    reset, 
    setLoading,
    clearError, 
    clearMessage,
    setAuthenticated,
    setToken
} = authReducer.actions;

export default authReducer.reducer;