// Zustand is used for global state management. It's used to create custom hooks that manage state.
import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null, // initially no user logged in yet
    isSigningUp: false,
    IsLoggingIn: false,
    IsUpdatingProfile: false,

    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check"); // axios config: api/auth/check
            set({ authUser: res.data });            
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ authUser: null });
        } finally { // run regardless of success or failure
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {

    }
}));