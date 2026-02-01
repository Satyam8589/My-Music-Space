import { registerUser, loginUser, generateAccessAndRefreshTokens } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAccessToken, verifyRefreshToken } from "../../utils/jwt.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import User from "../user/user.model.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

export const registerUserController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const { user, accessToken, refreshToken } = await registerUser({ name, email, password });
    
    return res
        .status(201)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(201, "User registered successfully", { user, accessToken })
        );
});

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const { user, accessToken, refreshToken } = await loginUser({ email, password });
    
    return res
        .status(200)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(200, "Login successful", { user, accessToken })
        );
});

export const refreshAccessTokenController = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = verifyRefreshToken(incomingRefreshToken);
        const user = await User.findById(decodedToken?.userId).select("+refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid refresh token");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "Refresh token is expired or used");
        }

        const accessToken = generateAccessToken({ 
            userId: user._id,
            email: user.email
        });

        return res
            .status(200)
            .json(
                new ApiResponse(200, "Access token refreshed", { accessToken })
            );
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token");
    }
});

export const logoutUserController = asyncHandler(async (req, res) => {
    // Clear the cookie
    return res
        .status(200)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, "Logout successful", {}));
});

export const googleAuthCallback = asyncHandler(async (req, res) => {
    const user = req.user;

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    
    const frontendURL = process.env.FRONTEND_URL || "http://localhost:3001";
    
    // Set cookie and redirect
    res.cookie("refreshToken", refreshToken, cookieOptions);
    return res.redirect(`${frontendURL}/login?token=${accessToken}`);
});
