import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { getUserById, updateUserPreferences } from "./user.service.js";

export const getProfileController = asyncHandler(async (req, res) => {
    const user = await getUserById(req.user.userId);
    return res.status(200).json(
        new ApiResponse(200, "User profile retrieved", user)
    );
});

export const updatePreferencesController = asyncHandler(async (req, res) => {
    const { languages } = req.body;
    const user = await updateUserPreferences(req.user.userId, languages);
    
    return res.status(200).json(
        new ApiResponse(200, "Preferences updated successfully", user)
    );
});
