import User from "../user/user.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateAccessToken } from "../../utils/jwt.js";
import { ApiError } from "../../utils/ApiError.js";

export const registerUser = async (userData) => {
    try {
        let { name, email, password } = userData;
        name = name?.trim();
        email = email?.trim();

        if (!name || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new ApiError(400, "Password must be at least 8 characters with uppercase, lowercase, and number");
        }

        const existingUser = await User.findOne({ email });
        
        if (existingUser) {
            throw new ApiError(409, "Email already exists");
        }

        const hashedPassword = await hashPassword(password);

        const user = await User.create({ 
            name, 
            email, 
            password: hashedPassword
        });

        if (!user) {
            throw new ApiError(500, "Failed to create user");
        }

        const userObject = user.toObject();
        const { password: _, ...userWithoutPassword } = userObject;

        return userWithoutPassword;

    } catch (error) {
        throw error;
    }
};

export const loginUser = async (userData) => {
    try {
        let { email, password } = userData;

        email = email?.trim();

        if (!email || !password) {
            throw new ApiError(400, "All fields are required");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ApiError(400, "Invalid email format");
        }
        
        const user = await User.findOne({ email }).select("+password");
        
        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }
        
        const isPasswordValid = await comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid credentials");
        }
        
        const accessToken = generateAccessToken({ 
            userId: user._id,
            email: user.email
        });
        
        const userObject = user.toObject();
        const { password: _, ...userWithoutPassword } = userObject;
        
        return { 
            accessToken, 
            user: userWithoutPassword
        };
    } catch (error) {
        throw error;
    }
};
