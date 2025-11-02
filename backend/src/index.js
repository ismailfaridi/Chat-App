import express from "express";
// const app = express();
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
// .env file
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT;
import { connectDB } from "./lib/db.js";
// parse jwt cookies, so we can grab the values out of it.
import cookieParser from "cookie-parser";
// CORS (Cross-Origin Resource Sharing) middleware allow access to resources from different origins.
import cors from "cors";
// Socket.io Server
import { app, server } from "./lib/socket.js";

// Allow to extract JSON data from request body
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // allow cookies or auth headers to be sent with requests
}));

// Auth Middleware
app.use("/api/auth", authRoutes);

app.use("/api/messages", messageRoutes);

// app.listen(PORT, () => {
server.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
    connectDB()
});