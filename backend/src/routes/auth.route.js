import express from "express";
const router = express.Router();
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// protectRoute is a middleware to AUTH the user if it's logged in.
router.put("/update-profile", protectRoute, updateProfile);

// check route checks if the user is authenticated or not.
// Example: When user refresh the page, we just have to check if the user is authenticated.
router.get("/check", protectRoute, checkAuth);

export default router;