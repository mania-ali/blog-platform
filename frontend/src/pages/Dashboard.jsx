import { Link, useNavigate } from "react-router-dom";
import { useUserPosts } from "../hooks/usePosts";
import { getUserIdFromToken } from "../utils/decodeToken";
import { useAuth } from "../hooks/useAuth";
import PostCard from "../components/posts/PostCard";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/Error";

export default function Dashboard() {
  const { token, user, logout } = useAuth();
  const userId = getUserIdFromToken(token);
  const navigate = useNavigate();

  const { data, isLoading, error } = useUserPosts(userId);

  const handleLogout = () => {
    navigate("/login", { replace: true });
    logout();
  };

  if (isLoading) return <Loading message="Loading your dashboard..." />;
  if (error) return <ErrorMessage message="Couldn't load dashboard posts." />;

  const posts = data?.posts || [];

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/feed" className="text-2xl font-black text-[#1877f2] tracking-tight">
            Scribble
          </Link>

          <div className="flex items-center gap-3">
    
            <button
              onClick={handleLogout}
              className="text-xs sm:text-sm font-semibold text-gray-600 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4">
            {/* User Quick Profile Card */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-gray-900 truncate">
                    {user?.username || "Your Account"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "Manage your content"}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Menu Links */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-2 space-y-1">
              <Link
                to="/feed"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span>News Feed</span>
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm text-[#1877f2] bg-blue-50/70"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                <span>My Posts</span>
              </Link>

              <Link
                to="/posts/new"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                <span>New Scribble</span>
              </Link>
            </div>
          </aside>

          {/* ================= CENTER DASHBOARD CONTENT ================= */}
          <main className="lg:col-span-6 space-y-4">
            {/* Create Post Prompt Card */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <button
                  onClick={() => navigate("/posts/new")}
                  className="flex-1 bg-gray-100 hover:bg-gray-200/80 text-left text-gray-500 text-sm font-medium px-4 py-2.5 rounded-full transition cursor-pointer"
                >
                  What's on your mind, {user?.username || "writer"}?
                </button>
              </div>
            </div>

            {/* Dashboard Section Header */}
            <div className="flex items-center justify-between pt-2">
              <h1 className="text-lg font-bold text-gray-900">Your Posts</h1>
              <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>

            {/* Posts List */}
            {posts.length === 0 ? (
              <div className="bg-white rounded-xl border border-gray-200 shadow-xs p-8 text-center space-y-3">
                <p className="text-gray-500 font-medium">You haven't posted anything yet.</p>
                <Link
                  to="/posts/new"
                  className="inline-block bg-blue-50 text-[#1877f2] hover:bg-blue-100 font-semibold px-4 py-2 rounded-lg transition text-sm"
                >
                  Write your first post
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} showOwnerActions />
                ))}
              </div>
            )}
          </main>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4">
            {/* Account Quick Stats Widget */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 space-y-3">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <span>📊</span> Quick Analytics
              </h2>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xl font-extrabold text-[#1877f2]">{posts.length}</p>
                  <p className="text-xs font-medium text-gray-500">Total Posts</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <p className="text-xl font-extrabold text-green-600">
                    {posts.filter((p) => p.published !== false).length}
                  </p>
                  <p className="text-xs font-medium text-gray-500">Published</p>
                </div>
              </div>
            </div>

            {/* Platform Footer Links */}
            <div className="px-2 text-xs text-gray-400 space-y-1">
              <p>© 2026 Scribble, Inc.</p>
              <p>Privacy · Terms · Cookies · Capstone Project</p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}