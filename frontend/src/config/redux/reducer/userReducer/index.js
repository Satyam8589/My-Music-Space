import { createSlice } from "@reduxjs/toolkit";
import { getUserProfileAction, updateUserPreferencesAction } from "../../action/userAction";

const initialState = {
    profile: null,
    preferences: {
        languages: []
    },
    isLoading: false,
    error: null,
    message: ""
};

const userReducer = createSlice({
    name: "user",
    initialState,
    reducers: {
        reset: () => initialState,
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUserProfileAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getUserProfileAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profile = action.payload;
            state.preferences.languages = action.payload.preferredLanguages || [];
            state.error = null;
        });
        builder.addCase(getUserProfileAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        
        builder.addCase(updateUserPreferencesAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateUserPreferencesAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.profile = action.payload;
            state.preferences.languages = action.payload.preferredLanguages || [];
            state.error = null;
            state.message = "Preferences updated successfully";
        });
        builder.addCase(updateUserPreferencesAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { 
    reset, 
    clearError, 
    clearMessage 
} = userReducer.actions;

export default userReducer.reducer;
