import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { getProfileController, updatePreferencesController } from "./user.controller.js";

const router = Router();

router.use(authMiddleware);

router.get("/profile", getProfileController);
router.patch("/preferences", updatePreferencesController);

export default router;
