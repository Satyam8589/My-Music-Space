import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import musicRoutes from "../modules/music/music.routes.js";
import searchRoutes from "../modules/search/search.routes.js";
import userRoutes from "../modules/user/user.routes.js";

const router = Router();

// Mount all module routes
router.use("/auth", authRoutes);
router.use("/music", musicRoutes);
router.use("/search", searchRoutes);
router.use("/user", userRoutes);


export default router;
