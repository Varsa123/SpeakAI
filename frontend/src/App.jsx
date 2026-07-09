import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Practice from "./pages/Practice/Practice";
import Profile from "./pages/Profile/Profile";
import History from "./pages/History/History";
import Settings from "./pages/Settings/Settings";
import Conversation from "./pages/Conversation/Conversation";
import Leaderboard from "./pages/Leaderboard/Leaderboard";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
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
  );
}

export default App;