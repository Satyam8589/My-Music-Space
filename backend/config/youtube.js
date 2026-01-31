import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const youtube = axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3",
    params: {
        key: process.env.YOUTUBE_API_KEY
    }
});

export default youtube;
