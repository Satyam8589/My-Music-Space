import mongoose from "mongoose";
import dotenv from "dotenv";
import { asyncHandler } from "../utils/asyncHandler.js";
dotenv.config();

const connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("MongoDB connected");
});

export default connectDB;