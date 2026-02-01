import { Router } from "express";
import passport from "passport";
import { 
    registerUserController, 
    loginUserController,
    refreshAccessTokenController,
    logoutUserController,
    googleAuthCallback
} from "./auth.controller.js";

const router = Router();

// Public local auth routes
router.route("/register").post(registerUserController);
router.route("/login").post(loginUserController);
router.route("/refresh-token").post(refreshAccessTokenController);
router.route("/logout").post(logoutUserController);

// Google OAuth routes
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", 
    passport.authenticate("google", { session: false, failureRedirect: "/login" }),
    googleAuthCallback
);

export default router;
