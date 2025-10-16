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
        const user = await User.findOne({ email });
        
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
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        const isPassCorrect = await bcrypt.compare(password, user.password);

        if(!isPassCorrect) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const logout = (req, res) => {
    try {
        // clear the cookie
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully." });

    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const updateProfile = async (req, res) => {
    try {

    } catch (error) {

    }
}