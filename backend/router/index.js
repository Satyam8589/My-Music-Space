import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import musicRoutes from "../modules/music/music.routes.js";

const router = Router();

// Mount all module routes
router.use("/auth", authRoutes);
router.use("/music", musicRoutes);


export default router;
