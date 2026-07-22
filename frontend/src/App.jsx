import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import PostView from "./pages/PostView";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/Dashboard";
import NewPost from "./pages/NewPost";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import EditPost from "./pages/EditPost";

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/feed" element={<Feed />} />
      <Route path="/posts/:id" element={<PostView />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/new"
        element={
          <ProtectedRoute>
            <NewPost />
          </ProtectedRoute>
        }
      />
      <Route
  path="/posts/edit/:id"
  element={
    <ProtectedRoute>
      <EditPost />
    </ProtectedRoute>
  }
/>
    </Routes>
  );
}