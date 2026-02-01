import { createSlice } from "@reduxjs/toolkit";
import {
    searchSongsAction,
    getTop100SongsAction,
    getRecommendedSongsAction,
    getSearchSuggestionsAction,
    clearSearchResultsAction
} from "../../action/searchAction";

const initialState = {
    results: [],
    top100: [],
    recommended: [],
    suggestions: [],
    query: "",
    isLoading: false,
    error: null,
    message: ""
};

const searchReducer = createSlice({
    name: "search",
    initialState,
    reducers: {
        reset: () => initialState,
        clearError: (state) => {
            state.error = null;
        },
        clearMessage: (state) => {
            state.message = "";
        },
        setQuery: (state, action) => {
            state.query = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchSongsAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(searchSongsAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.results = action.payload;
            state.error = null;
        });
        builder.addCase(searchSongsAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.results = [];
        });
        
        builder.addCase(getTop100SongsAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getTop100SongsAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.top100 = action.payload;
            state.error = null;
        });
        builder.addCase(getTop100SongsAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.top100 = [];
        });
        
        builder.addCase(getRecommendedSongsAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getRecommendedSongsAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.recommended = action.payload;
            state.error = null;
        });
        builder.addCase(getRecommendedSongsAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.recommended = [];
        });
        
        builder.addCase(getSearchSuggestionsAction.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(getSearchSuggestionsAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.suggestions = action.payload;
            state.error = null;
        });
        builder.addCase(getSearchSuggestionsAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            state.suggestions = [];
        });
        
        builder.addCase(clearSearchResultsAction.fulfilled, (state) => {
            state.results = [];
            state.query = "";
            state.suggestions = [];
            state.error = null;
        });
    }
});

export const { 
    reset, 
    clearError, 
    clearMessage,
    setQuery
} = searchReducer.actions;

export default searchReducer.reducer;
