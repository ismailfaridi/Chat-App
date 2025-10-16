import express from "express";
const router = express.Router();
import { login, logout, signup, updateProfile } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// protectRoute is a middleware to AUTH the user if it's logged in.
router.put("/update-profile", protectRoute, updateProfile);

export default router;