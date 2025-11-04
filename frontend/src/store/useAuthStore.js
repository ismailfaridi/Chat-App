// Zustand is used for global state management. It's used to create custom hooks that manage state.
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import { toast } from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null, // initially no user logged in yet
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); // axios config: api/auth/check
            set({ authUser: res.data });
            // connect to socket
            get().connectSocket();

        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });

        } finally { // run regardless of success or failure
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSigningUp: true });

        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
            // connect to socket
            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (data) => {
        set({ isLoggingIn: true });

        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
            // connect to socket
            get().connectSocket();
            
        } catch (error) {
            toast.error(error.response.data.message);

        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out successfully!");
            // disconnect from socket
            get().disconnectSocket();
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });

        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        } finally {
            set({ isUpdatingProfile: false });
        }
    },

    connectSocket: () => {
        // If user is not authenticated or we are already connected, do not connect.
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id,
            }
        });
        socket.connect();

        set({ socket: socket });

        // listen for getonlineUsers from backend
        socket.on("getonlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        })
    },

    disconnectSocket: () => {
        if(get().socket?.connected) {
            get().socket.disconnect();
        }
    }
}));