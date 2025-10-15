import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js";
// .env file
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import { connectDB } from "./lib/db.js"

// Allow to extract JSON data from request body
app.use(express.json());

// Auth Middleware
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
    connectDB()
});