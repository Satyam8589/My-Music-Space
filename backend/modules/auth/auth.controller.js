import { registerUser, loginUser } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAccessToken } from "../../utils/jwt.js";

export const registerUserController = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const user = await registerUser({ name, email, password });
    
    res.status(201).json({ 
        success: true, 
        message: "User registered successfully",
        data: user 
    });
});

export const loginUserController = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    
    const result = await loginUser({ email, password });
    
    res.status(200).json({
        success: true,
        message: "Login successful",
        data: {
            accessToken: result.accessToken,
            user: result.user
        }
    });
});

export const googleAuthCallback = asyncHandler(async (req, res) => {
    // Passport attaches the user to req.user after successful authentication
    const user = req.user;

    const accessToken = generateAccessToken({
        userId: user._id,
        email: user.email,
    });

    // In a real app, you might redirect to the frontend with the token
    // For testing, we'll return it as JSON
    res.status(200).json({
        success: true,
        message: "Google login successful",
        data: {
            accessToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                picture: user.picture,
                authProvider: user.authProvider,
            }
        }
    });
});

