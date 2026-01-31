import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

app.get("/health", (req, res) => {
    return res.status(200).json({ message: "My Music Space Server is running" });
});

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

export default app;