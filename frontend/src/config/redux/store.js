import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducer/authReducer";
import userReducer from "./reducer/userReducer";
import musicReducer from "./reducer/musicReducer";
import searchReducer from "./reducer/searchReducer";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        music: musicReducer,
        search: searchReducer
    }
});