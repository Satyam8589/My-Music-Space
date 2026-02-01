import { createSlice } from "@reduxjs/toolkit";
import {
    getAllMoodsAction,
    createMoodAction,
    getMoodByIdAction,
    deleteMoodAction,
    addSongToMoodAction,
    removeSongFromMoodAction,
    updateSongModeAction
} from "../../action/musicAction";

const initialState = {
    moods: [],
    currentMood: null,
    isLoading: false,
    error: null,
    message: ""
};

const musicReducer = createSlice({
    name: "music",
    initialState,
    reducers: {
        reset: () => initialState,
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = "";
        },
        setCurrentMood: (state, action) => {
            state.currentMood = action.payload;
        },
        clearCurrentMood: (state) => {
            state.currentMood = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllMoodsAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getAllMoodsAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.moods = action.payload;
            state.error = null;
        });
        builder.addCase(getAllMoodsAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        
        builder.addCase(createMoodAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(createMoodAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.moods.push(action.payload);
            state.error = null;
            state.message = "Mood space created successfully";
        });
        builder.addCase(createMoodAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        
        builder.addCase(getMoodByIdAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getMoodByIdAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.currentMood = action.payload;
            state.error = null;
        });
        builder.addCase(getMoodByIdAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        
        builder.addCase(deleteMoodAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(deleteMoodAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.moods = state.moods.filter(mood => mood._id !== action.payload.spaceId);
            if (state.currentMood?._id === action.payload.spaceId) {
                state.currentMood = null;
            }
            state.error = null;
            state.message = "Mood space deleted successfully";
        });
        builder.addCase(deleteMoodAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        
        builder.addCase(addSongToMoodAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(addSongToMoodAction.fulfilled, (state, action) => {
            state.isLoading = false;
            const moodIndex = state.moods.findIndex(m => m._id === action.payload._id);
            if (moodIndex !== -1) {
                state.moods[moodIndex] = action.payload;
            }
            if (state.currentMood?._id === action.payload._id) {
                state.currentMood = action.payload;
            }
            state.error = null;
            state.message = "Song added successfully";
        });
        builder.addCase(addSongToMoodAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        
        builder.addCase(removeSongFromMoodAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(removeSongFromMoodAction.fulfilled, (state, action) => {
            state.isLoading = false;
            const moodIndex = state.moods.findIndex(m => m._id === action.payload._id);
            if (moodIndex !== -1) {
                state.moods[moodIndex] = action.payload;
            }
            if (state.currentMood?._id === action.payload._id) {
                state.currentMood = action.payload;
            }
            state.error = null;
            state.message = "Song removed successfully";
        });
        builder.addCase(removeSongFromMoodAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
        
        builder.addCase(updateSongModeAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(updateSongModeAction.fulfilled, (state, action) => {
            state.isLoading = false;
            const moodIndex = state.moods.findIndex(m => m._id === action.payload._id);
            if (moodIndex !== -1) {
                state.moods[moodIndex] = action.payload;
            }
            if (state.currentMood?._id === action.payload._id) {
                state.currentMood = action.payload;
            }
            state.error = null;
            state.message = "Song mode updated successfully";
        });
        builder.addCase(updateSongModeAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    }
});

export const { 
    reset, 
    clearError, 
    clearMessage,
    setCurrentMood,
    clearCurrentMood
} = musicReducer.actions;

export default musicReducer.reducer;
