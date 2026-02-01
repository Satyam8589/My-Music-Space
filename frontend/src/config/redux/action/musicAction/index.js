import { createAsyncThunk } from "@reduxjs/toolkit";
import { clientServer } from "@/config";

export const getAllMoodsAction = createAsyncThunk(
    "music/getAllMoods",
    async (_, thunkAPI) => {
        try {
            const response = await clientServer.get("/music");
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const createMoodAction = createAsyncThunk(
    "music/createMood",
    async ({ name, description }, thunkAPI) => {
        try {
            const response = await clientServer.post("/music", {
                name,
                description
            });
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const getMoodByIdAction = createAsyncThunk(
    "music/getMoodById",
    async (spaceId, thunkAPI) => {
        try {
            const response = await clientServer.get(`/music/${spaceId}`);
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const deleteMoodAction = createAsyncThunk(
    "music/deleteMood",
    async (spaceId, thunkAPI) => {
        try {
            const response = await clientServer.delete(`/music/${spaceId}`);
            return { spaceId, ...response.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const addSongToMoodAction = createAsyncThunk(
    "music/addSongToMood",
    async ({ spaceId, songData }, thunkAPI) => {
        try {
            const response = await clientServer.post(
                `/music/${spaceId}/songs`,
                songData
            );
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const removeSongFromMoodAction = createAsyncThunk(
    "music/removeSongFromMood",
    async ({ spaceId, videoId }, thunkAPI) => {
        try {
            const response = await clientServer.delete(
                `/music/${spaceId}/songs/${videoId}`
            );
            return { spaceId, videoId, ...response.data.data };
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

export const updateSongModeAction = createAsyncThunk(
    "music/updateSongMode",
    async ({ spaceId, videoId, mode }, thunkAPI) => {
        try {
            const response = await clientServer.patch(
                `/music/${spaceId}/songs/${videoId}`,
                { mode }
            );
            return response.data.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);