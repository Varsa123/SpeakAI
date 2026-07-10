import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Loader from "./components/common/Loader";

// Lazy Loaded Pages
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Register = lazy(() => import("./pages/Register/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Practice = lazy(() => import("./pages/Practice/Practice"));
const Profile = lazy(() => import("./pages/Profile/Profile"));
const History = lazy(() => import("./pages/History/History"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
const Conversation = lazy(() =>
  import("./pages/Conversation/Conversation")
);
const Leaderboard = lazy(() =>
  import("./pages/Leaderboard/Leaderboard")
);

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/practice"
          element={
            <ProtectedRoute>
              <Practice />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/conversation"
          element={
            <ProtectedRoute>
              <Conversation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default App;