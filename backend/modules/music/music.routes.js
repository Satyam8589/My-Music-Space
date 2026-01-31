import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { 
    getAllMoodsController, 
    createMoodController,
    getMoodByIdController,
    addSongToMoodController, 
    removeSongFromMoodController, 
    updateSongModeInMoodController,
    deleteMoodController
} from "./music.controller.js";

const router = Router();

router.use(authMiddleware);

router.route("/")
    .get(getAllMoodsController)     
    .post(createMoodController);    

router.route("/:spaceId")
    .get(getMoodByIdController)     
    .delete(deleteMoodController);  

router.route("/:spaceId/songs")
    .post(addSongToMoodController);  

router.route("/:spaceId/songs/:videoId")
    .delete(removeSongFromMoodController)  
    .patch(updateSongModeInMoodController); 

export default router;
