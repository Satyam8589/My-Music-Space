import User from "./user.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const getUserById = async (userId) => {
    try {
        const user = await User.findById(userId).select("-password");
        
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        
        return user;
    } catch (error) {
        throw error;
    }
};

export const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user;
    } catch (error) {
        throw error;
    }
};

export const getUserByGoogleId = async (googleId) => {
    try {
        const user = await User.findOne({ googleId });
        return user;
    } catch (error) {
        throw error;
    }
};
