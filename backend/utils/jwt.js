import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
    try {
        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { 
                expiresIn: process.env.JWT_EXPIRES_IN || "1h"
            }
        );
        return token;
    } catch (error) {
        throw new Error(`Error generating access token: ${error.message}`);
    }
};

export const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Access token has expired');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid access token');
        }
        throw new Error(`Error verifying access token: ${error.message}`);
    }
};
