import { Router } from "express";
import { getTop100SongsController, searchSongsController, getRecommendedSongsController, getSearchRecommendationsController } from "./search.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

// Endpoint for personalized recommendations (Protected)
router.get("/recommended", authMiddleware, getRecommendedSongsController);

router.get("/suggestions", getSearchRecommendationsController);
router.get("/top-100", getTop100SongsController);
router.get("/", searchSongsController);


export default router;
