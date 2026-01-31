import { Router } from "express";
import { 
    registerUserController, 
    loginUserController
} from "./auth.controller.js";

const router = Router();

// Public routes
router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);

export default router;
