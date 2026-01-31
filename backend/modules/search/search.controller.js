import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { getTop100Songs, searchSongs, getRecommendedSongs } from "./search.service.js";

export const getRecommendedSongsController = asyncHandler(async (req, res) => {
    const songs = await getRecommendedSongs(req.user.userId);
    
    return res.status(200).json(
        new ApiResponse(200, "Recommended songs retrieved", songs)
    );
});

export const getTop100SongsController = asyncHandler(async (req, res) => {
    const { region = "IN" } = req.query;
    const songs = await getTop100Songs(region);
    
    return res.status(200).json(
        new ApiResponse(200, `Top 100 music videos for ${region} retrieved successfully`, songs)
    );
});


export const searchSongsController = asyncHandler(async (req, res) => {
    const { q } = req.query;
    const songs = await searchSongs(q);
    
    return res.status(200).json(
        new ApiResponse(200, "Search results retrieved", songs)
    );
});
