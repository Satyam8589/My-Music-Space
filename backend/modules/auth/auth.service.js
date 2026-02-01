import User from "../user/user.model.js";
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { ApiError } from "../../utils/ApiError.js";

export const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = generateAccessToken({ 
            userId: user._id,
            email: user.email
        });
        const refreshToken = generateRefreshToken({ 
            userId: user._id
        });

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

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

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        delete userWithoutPassword.refreshToken;

        return { user: userWithoutPassword, accessToken, refreshToken };

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

        const user = await User.findOne({ email }).select("+password");
        
        if (!user) {
            throw new ApiError(401, "Invalid credentials");
        }
        
        const isPasswordValid = await comparePassword(password, user.password);
        
        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid credentials");
        }
        
        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
        
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        delete userWithoutPassword.refreshToken;
        
        return { 
            accessToken, 
            refreshToken,
            user: userWithoutPassword
        };
    } catch (error) {
        throw error;
    }
};
