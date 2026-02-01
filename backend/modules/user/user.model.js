import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: false,  // Not required for Google OAuth users
        select: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true  // Allows null values while maintaining uniqueness
    },
    picture: {
        type: String  // Google profile picture URL
    },
    authProvider: {
        type: String,
        enum: ["local", "google"],
        default: "local"
    },
    preferredLanguages: {
        type: [String],
        default: []
    },
    refreshToken: {
        type: String,
        select: false
    }
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);
