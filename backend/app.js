import express from "express";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import "./config/passport.js"; // Initialize passport config
import router from "./router/index.js";
import { errorMiddleware } from "./middleware/error.middleware.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());


app.get("/health", (req, res) => {
    return res.status(200).json({ message: "My Music Space Server is running" });
});

app.use("/api/v1", router);

app.use(errorMiddleware);

export default app;