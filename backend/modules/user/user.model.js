import mongoose from "mongoose";

const musicSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        enum: ["audio", "video"],
        default: "audio"
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

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
        required: true,
        select: false
    },
    musicSpace: [musicSchema]
}, {
    timestamps: true
});

export default mongoose.model("User", userSchema);
