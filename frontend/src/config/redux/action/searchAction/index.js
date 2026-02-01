import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

export const searchSongsAction = createAsyncThunk(
    "search/searchSongs",
    async (query, thunkAPI) => {
        try {
            const response = await clientServer.get(
                `/search?q=${encodeURIComponent(query)}`
            );
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getTop100SongsAction = createAsyncThunk(
    "search/getTop100",
    async (region = "IN", thunkAPI) => {
        try {
            const response = await clientServer.get(
                `/search/top-100?region=${region}`
            );
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getRecommendedSongsAction = createAsyncThunk(
    "search/getRecommended",
    async (_, thunkAPI) => {
        try {
            const response = await clientServer.get("/search/recommended");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getSearchSuggestionsAction = createAsyncThunk(
    "search/getSuggestions",
    async (query, thunkAPI) => {
        try {
            const response = await clientServer.get(
                `/search/suggestions?query=${encodeURIComponent(query)}`
            );
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const clearSearchResultsAction = createAsyncThunk(
    "search/clearResults",
    async (_, thunkAPI) => {
        try {
            return { results: [], query: "" };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);
