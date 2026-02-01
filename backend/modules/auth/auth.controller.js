import { registerUser, loginUser } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

export const registerUserController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await registerUser({ name, email, password });
    
    return res.status(201).json(
        new ApiResponse(201, "User registered successfully", user)
    );
});

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const result = await loginUser({ email, password });
    
    return res.status(200).json(
        new ApiResponse(200, "Login successful", {
            accessToken: result.accessToken,
            user: result.user
        })
    );
});

export const googleAuthCallback = asyncHandler(async (req, res) => {
    // Passport attaches the user to req.user after successful authentication
    const user = req.user;

    const accessToken = generateAccessToken({
        userId: user._id,
        email: user.email,
    });

    return res.status(200).json(
        new ApiResponse(200, "Google login successful", {
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                authProvider: user.authProvider,
            }
        })
    );
});

