import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

export const loginAction = createAsyncThunk(
    "auth/login",
    async (userData, thunkAPI) => {
        try {
            const response = await clientServer.post("/auth/login", {
                email: userData.email,
                password: userData.password,
            });
            if (response.data?.data?.accessToken) {
                localStorage.setItem("token", response.data.data.accessToken);
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const registerAction = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const response = await clientServer.post("/auth/register", {
                email: userData.email,
                password: userData.password,
                name: userData.name,
            });
            if (response.data?.data?.accessToken) {
                localStorage.setItem("token", response.data.data.accessToken);
            }
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const logoutAction = createAsyncThunk(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            if (typeof window !== "undefined") {
                localStorage.removeItem("token");
            }
            return { message: "Logout successful" };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);