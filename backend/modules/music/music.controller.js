import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { 
    getAllMoodSpaces, 
    createMoodSpace, 
    getMoodSpaceById,
    addSongToMoodSpace, 
    removeSongFromMoodSpace, 
    updateSongModeInSpace,
    deleteMoodSpace
} from "./music.service.js";

export const getAllMoodsController = asyncHandler(async (req, res) => {
    const moods = await getAllMoodSpaces(req.user.userId);
    return res.status(200).json(
        new ApiResponse(200, "All mood spaces retrieved", moods)
    );
});

export const createMoodController = asyncHandler(async (req, res) => {
    const { name, description } = req.body;
    const moodSpace = await createMoodSpace(req.user.userId, name, description);
    return res.status(201).json(
        new ApiResponse(201, `Mood space "${name}" created`, moodSpace)
    );
});

export const getMoodByIdController = asyncHandler(async (req, res) => {
    const { spaceId } = req.params;
    const moodSpace = await getMoodSpaceById(req.user.userId, spaceId);
    return res.status(200).json(
        new ApiResponse(200, "Mood space retrieved", moodSpace)
    );
});

export const addSongToMoodController = asyncHandler(async (req, res) => {
    const { spaceId } = req.params;
    const moodSpace = await addSongToMoodSpace(req.user.userId, spaceId, req.body);
    return res.status(201).json(
        new ApiResponse(201, "Song added to mood space", moodSpace)
    );
});

export const removeSongFromMoodController = asyncHandler(async (req, res) => {
    const { spaceId, videoId } = req.params;
    const moodSpace = await removeSongFromMoodSpace(req.user.userId, spaceId, videoId);
    return res.status(200).json(
        new ApiResponse(200, "Song removed from mood space", moodSpace)
    );
});

export const deleteMoodController = asyncHandler(async (req, res) => {
    const { spaceId } = req.params;
    await deleteMoodSpace(req.user.userId, spaceId);
    return res.status(200).json(
        new ApiResponse(200, "Mood space deleted successully")
    );
});

export const updateSongModeInMoodController = asyncHandler(async (req, res) => {
    const { spaceId, videoId } = req.params;
    const { mode } = req.body;
    const moodSpace = await updateSongModeInSpace(req.user.userId, spaceId, videoId, mode);
    return res.status(200).json(
        new ApiResponse(200, `Mode updated to ${mode}`, moodSpace)
    );
});
