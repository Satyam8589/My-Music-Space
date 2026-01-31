import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
    videoId: {
        type: String,
        required: [true, "Video ID is required"],
    },
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail is required"]
    },
    channelTitle: {
        type: String,
        trim: true
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

const moodSpaceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: [true, "Mood name is required"],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    songs: [songSchema]
}, {
    timestamps: true
});

moodSpaceSchema.index({ owner: 1, name: 1 }, { unique: true });

const MoodSpace = mongoose.model("MoodSpace", moodSpaceSchema);

export default MoodSpace;