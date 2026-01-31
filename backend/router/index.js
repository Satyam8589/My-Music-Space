import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";

const router = Router();

// Mount all module routes
router.use("/auth", authRoutes);

// You can add more routes here as the app grows:
// router.use("/music", musicRoutes);
// router.use("/search", searchRoutes);

export default router;
