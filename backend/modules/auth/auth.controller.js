import { registerUser, loginUser } from "./auth.service.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

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
