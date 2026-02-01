import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
    try {
        const token = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            { 
                expiresIn: process.env.JWT_ACCESS_EXPIRY || "15m"
            }
        );
        return token;
    } catch (error) {
        throw new Error(`Error generating access token: ${error.message}`);
    }
};

export const generateRefreshToken = (payload) => {
    try {
        const token = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            { 
                expiresIn: process.env.JWT_REFRESH_EXPIRY || "7d"
            }
        );
        return token;
    } catch (error) {
        throw new Error(`Error generating refresh token: ${error.message}`);
    }
};

export const verifyAccessToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
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

export const verifyRefreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
        return decoded;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Refresh token has expired');
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid refresh token');
        }
        throw new Error(`Error verifying refresh token: ${error.message}`);
    }
};
