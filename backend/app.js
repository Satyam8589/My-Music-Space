import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import "./config/passport.js";
import router from "./router/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import { ApiResponse } from "./utils/ApiResponse.js";

import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// CORS configuration - normalize origins by removing trailing slashes
const corsOrigins = (process.env.CORS_ORIGIN || "http://localhost:3001")
    .split(',')
    .map(origin => origin.trim().replace(/\/$/, '')); // Remove trailing slash

app.use(cors({ 
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        // Normalize the incoming origin by removing trailing slash
        const normalizedOrigin = origin.replace(/\/$/, '');
        
        if (corsOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true 
}));

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));
app.use(express.static(path.join(__dirname, "../frontend")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000, 
        max: 100, 
        message: "Too many requests from this IP, please try again after 15 minutes",
    }));
}

app.use(hpp());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use(passport.initialize());

app.get("/health", (req, res) => {
    return res.status(200).json(new ApiResponse(200, "My Music Space Server is running"));
});

app.use("/api/v1", router);

app.use(errorMiddleware);

export default app;