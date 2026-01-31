import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import "./config/passport.js"; // Initialize passport config
import router from "./router/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "production") {
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000, 
        max: 100, 
        message: "Too many requests from this IP, please try again after 15 minutes",
    }));
}
app.use(helmet());
app.use(hpp());
app.use(cors());
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(passport.initialize());


app.get("/health", (req, res) => {
    return res.status(200).json({ message: "My Music Space Server is running" });
});

app.use("/api/v1", router);

app.use(errorMiddleware);

export default app;