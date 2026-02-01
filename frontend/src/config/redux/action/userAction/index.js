import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

export const getUserProfileAction = createAsyncThunk(
    "user/getProfile",
    async (_, thunkAPI) => {
        try {
            const response = await clientServer.get("/user/profile");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const updateUserPreferencesAction = createAsyncThunk(
    "user/updatePreferences",
    async (languages, thunkAPI) => {
        try {
            const response = await clientServer.patch("/user/preferences", {
                languages
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);
