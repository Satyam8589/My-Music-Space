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

const loadPlayHistory = () => {
    if (typeof window === 'undefined') return [];
    try {
        const savedHistory = localStorage.getItem('playHistory');
        return savedHistory ? JSON.parse(savedHistory) : [];
    } catch (error) {
        console.error('Error loading play history:', error);
        return [];
    }
};

const savePlayHistory = (history) => {
    if (typeof window === 'undefined') return;
    try {
        localStorage.setItem('playHistory', JSON.stringify(history));
    } catch (error) {
        console.error('Error saving play history:', error);
    }
};

const loadCurrentSong = () => {
    if (typeof window === 'undefined') return null;
    try {
        const savedSong = localStorage.getItem('currentSong');
        return savedSong ? JSON.parse(savedSong) : null;
    } catch (error) {
        console.error('Error loading current song:', error);
        return null;
    }
};

const saveCurrentSong = (song) => {
    if (typeof window === 'undefined') return;
    try {
        if (song) {
            localStorage.setItem('currentSong', JSON.stringify(song));
        } else {
            localStorage.removeItem('currentSong');
        }
    } catch (error) {
        console.error('Error saving current song:', error);
    }
};

const initialState = {
    moods: [],
    currentMood: null,
    currentSong: loadCurrentSong(),
    isPlaying: false,
    durationSeconds: 0,
    playedSeconds: 0,
    isVideoMode: false,
    volume: 0.8,
    seekTo: null,
    isLoading: false,
    error: null,
    message: "",
    playHistory: loadPlayHistory()
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
        },
        setCurrentSong: (state, action) => {
            if (state.currentSong?.videoId !== action.payload.videoId) {
                state.currentSong = action.payload;
                state.isPlaying = true;
                state.playedSeconds = 0;
                state.durationSeconds = 0;
                
                const newHistory = [
                    action.payload,
                    ...state.playHistory.filter(song => song.videoId !== action.payload.videoId)
                ].slice(0, 10);
                state.playHistory = newHistory;
                
                savePlayHistory(newHistory);
                saveCurrentSong(action.payload);
            } else {
                state.isPlaying = true;
            }
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        togglePlay: (state) => {
            state.isPlaying = !state.isPlaying;
        },
        setProgress: (state, action) => {
            state.playedSeconds = action.payload.playedSeconds;
            if (action.payload.durationSeconds) {
                state.durationSeconds = action.payload.durationSeconds;
            }
        },
        setIsVideoMode: (state, action) => {
            state.isVideoMode = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
        setSeekTo: (state, action) => {
            state.seekTo = action.payload;
        },
        clearSeekTo: (state) => {
            state.seekTo = null;
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
    clearCurrentMood,
    setCurrentSong,
    setIsPlaying,
    togglePlay,
    setProgress,
    setIsVideoMode,
    setVolume,
    setSeekTo,
    clearSeekTo
} = musicReducer.actions;

export default musicReducer.reducer;
