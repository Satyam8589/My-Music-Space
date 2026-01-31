import MoodSpace from "./music.model.js";
import { ApiError } from "../../utils/ApiError.js";

export const getAllMoodSpaces = async (userId) => {
    return await MoodSpace.find({ owner: userId });
};

export const createMoodSpace = async (userId, name, description) => {
    
    const existingSpace = await MoodSpace.findOne({ owner: userId, name });
    if (existingSpace) {
        throw new ApiError(400, `Mood space "${name}" already exists`);
    }

    const moodSpace = await MoodSpace.create({
        owner: userId,
        name,
        description
    });

    if (!moodSpace) {
        throw new ApiError(500, "Failed to create mood space");
    }

    return moodSpace;

};

export const getMoodSpaceById = async (userId, spaceId) => {
    const space = await MoodSpace.findOne({ _id: spaceId, owner: userId });
    if (!space) {
        throw new ApiError(404, "Mood space not found");
    }
    return space;
};

export const addSongToMoodSpace = async (userId, spaceId, songData) => {
    const space = await MoodSpace.findOne({ _id: spaceId, owner: userId });
    if (!space) {
        throw new ApiError(404, "Mood space not found");
    }

    const songExists = space.songs.some(song => song.videoId === songData.videoId);
    if (songExists) {
        throw new ApiError(400, "Song already exists in this mood space");
    }

    space.songs.push(songData);
    await space.save();
    return space;
};

export const removeSongFromMoodSpace = async (userId, spaceId, videoId) => {
    const space = await MoodSpace.findOne({ _id: spaceId, owner: userId });
    if (!space) {
        throw new ApiError(404, "Mood space not found");
    }

    space.songs = space.songs.filter(song => song.videoId !== videoId);
    await space.save();
    return space;
};

export const deleteMoodSpace = async (userId, spaceId) => {
    const space = await MoodSpace.findOneAndDelete({ _id: spaceId, owner: userId });
    if (!space) {
        throw new ApiError(404, "Mood space not found");
    }
    return space;
};

export const updateSongModeInSpace = async (userId, spaceId, videoId, mode) => {
    const space = await MoodSpace.findOne({ _id: spaceId, owner: userId });
    if (!space) {
        throw new ApiError(404, "Mood space not found");
    }

    const song = space.songs.find(s => s.videoId === videoId);
    if (!song) {
        throw new ApiError(404, "Song not found in this mood space");
    }

    song.mode = mode;
    const updatedSpace = await space.save();
    
    if(!updatedSpace){
        throw new ApiError(500, "Failed to update song mode");
    }
    return updatedSpace;
};