import { Routes, Route, Navigate } from "react-router-dom"; // prevent page reload
// Component imports
import Navbar from "./components/Navbar";
// Pages imports
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
// Zustand store import
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
// React imports
import { useEffect } from "react";
// Icon import
import { Loader } from "lucide-react";
// React Hot Toast for temporary notifications
import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, isCheckingAuth, onlineUsers, checkAuth } = useAuthStore();
  const { theme } = useThemeStore();

  console.log({ onlineUsers });

  useEffect(() => { // run when something changes
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  // Loading state while checking authentication - run when user refresh the page.
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  return (
    <div data-theme={theme}>
      <Navbar />

      {/* Client-Side Routing */}
      <Routes>
        <Route path="/"         element={authUser  ? <HomePage />    : <Navigate to="/login" />} />
        <Route path="/signup"   element={!authUser ? <SignUpPage />  : <Navigate to="/" />} />
        <Route path="/login"    element={!authUser ? <LoginPage />   : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile"  element={authUser  ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      {/* React Hot Toast */}
      <Toaster />
    </div>
  )
}

export default App;