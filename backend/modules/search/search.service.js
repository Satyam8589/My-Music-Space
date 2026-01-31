import youtube from "../../config/youtube.js";
import { ApiError } from "../../utils/ApiError.js";
import User from "../user/user.model.js";

export const getRecommendedSongs = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const languages = user.preferredLanguages;

        if (!languages || languages.length === 0) {
            return await getTop100Songs();
        }
        const query = languages.map(lang => `${lang} music`).join(" | ");
        
        const response = await youtube.get("/search", {
            params: {
                part: "snippet",
                maxResults: 50,
                q: query,
                type: "video",
                videoCategoryId: "10",
                order: "viewCount"
            }
        });

        const songs = response.data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            channelTitle: item.snippet.channelTitle,
            publishedAt: item.snippet.publishedAt
        }));

        return songs;

    } catch (error) {
        console.error("YouTube Recommended Error:", error.response?.data || error.message);
        throw new ApiError(500, "Failed to fetch recommended songs");
    }
};
export const getTop100Songs = async (regionCode = "IN") => {
    try {
        const commonParams = {
            part: "snippet,contentDetails,statistics",
            chart: "mostPopular",
            videoCategoryId: "10",
            maxResults: 50,
            regionCode: regionCode
        };

        const res1 = await youtube.get("/videos", {
            params: { ...commonParams }
        });

        const songsPage1 = res1.data.items;
        const nextPageToken = res1.data.nextPageToken;

        let allSongs = [...songsPage1];

        if (nextPageToken) {
            const res2 = await youtube.get("/videos", {
                params: { 
                    ...commonParams,
                    pageToken: nextPageToken
                }
            });
            allSongs = [...allSongs, ...res2.data.items];
        }

        return allSongs.map(video => ({
            videoId: video.id,
            title: video.snippet.title,
            thumbnail: video.snippet.thumbnails.high?.url || video.snippet.thumbnails.default?.url,
            channelTitle: video.snippet.channelTitle,
            viewCount: video.statistics.viewCount,
            publishedAt: video.snippet.publishedAt,
            duration: video.contentDetails.duration || "N/A"
        }));

    } catch (error) {
        console.error("YouTube API Error:", error.response?.data || error.message);
        throw new ApiError(
            error.response?.status || 500, 
            "Failed to fetch Top 100 songs from YouTube. Make sure your YOUTUBE_API_KEY is valid."
        );
    }
};

export const searchSongs = async (query) => {
    try {
        const response = await youtube.get("/search", {
            params: {
                part: "snippet",
                maxResults: 20,
                q: query,
                type: "video",
                videoCategoryId: "10"
            }
        });

        return response.data.items.map(item => ({
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.medium?.url,
            channelTitle: item.snippet.channelTitle
        }));
    } catch (error) {
        throw new ApiError(500, "YouTube search failed");
    }
};
