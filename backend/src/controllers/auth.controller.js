import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        // Validate input credentials
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All field are required." });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        // Check if user already exists
        const user = await User.findOne({email});
        
        if (user) {
            return res.status(400).json({ message: "Email already exists." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save user
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });
        
        if (newUser) {
            // Generate JWT (stateless auth)
            generateToken(newUser._id, res);

            // Save newUser in the DB
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data." });
        }
        
    } catch (error) {
        console.log("Error in signup contoller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = (req, res) => {
    res.send("login route");
}

export const logout = (req, res) => {
    res.send("logout route");
}