import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

// Socket.io server
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
    }
});

export function getReceiverSocketId(userId) {
    return userSocketMap[userId];
}

// Used to store online users
const userSocketMap = {}; // {userId: socketId}

// Listen for any incoming client connections
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId; // come from useAuthStore.js from frontend
    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // send events to all the connected clients, basically broadcast
    io.emit("getonlineUsers", Object.keys(userSocketMap));

    // Listen for disconnect event
    socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
        delete userSocketMap[userId];
        io.emit("getonlineUsers", Object.keys(userSocketMap));
    })
})

export { app, server, io };