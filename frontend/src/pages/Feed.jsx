import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { usePublishedPosts } from "../hooks/usePosts";
import { useAuth } from "../hooks/useAuth";
import PostCard from "../components/posts/PostCard";
import Pagination from "../components/posts/Pagination";
import Loading from "../components/common/Loading";
import Error from "../components/common/Error";

export default function Feed() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();
  const { token, user,logout } = useAuth();

  const { data, isLoading, error } = usePublishedPosts(page, limit);

  if (isLoading) return <Loading message="Loading posts..." />;
  if (error) return <Error message="Something went wrong loading posts." />;

  const posts = data?.posts || [];

  return (
    <div className="min-h-screen bg-[#f0f2f5] text-gray-900">
      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link to="/" className="text-2xl font-black text-[#1877f2] tracking-tight">
            Scribble
          </Link>

         <div className="flex items-center gap-3">
  {token ? (
    <button
      onClick={logout}
      className="text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition cursor-pointer"
    >
      Log out
    </button>
  ) : (
    <>
      <Link
        to="/login"
        className="text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition"
      >
        Log in
      </Link>
      <Link
        to="/register"
        className="bg-[#1877f2] hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-lg transition shadow-xs"
      >
        Sign up
      </Link>
    </>
  )}
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
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                  {user?.username?.[0]?.toUpperCase() || "S"}
                </div>
                <div className="overflow-hidden">
                  <p className="font-bold text-gray-900 truncate">
                    {user?.username || "Welcome Guest"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "Explore community posts"}
                  </p>
                </div>
              </div>

              {token && (
                <Link
                  to="/dashboard"
                  className="block text-center w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold py-2 rounded-lg transition"
                >
                  View Profile & My Posts
                </Link>
              )}
            </div>

            {/* Navigation Menu Links */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-2 space-y-1">
              <Link
                to="/feed"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-semibold text-sm text-[#1877f2] bg-blue-50/70"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M107 13a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1v-3a1 1 0 011-1h14zm0-6a1 1 0 011 1v3a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1h14zM3 3a1 1 0 00-1 1v3a1 1 0 001 1h14a1 1 0 001-1V4a1 1 0 00-1-1H3z" />
                </svg>
                <span>News Feed</span>
              </Link>

              <Link
                to="/dashboard"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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

          {/* ================= CENTER FEED ================= */}
          <main className="lg:col-span-6 space-y-4">
            {/* Facebook-style "What's on your mind?" Create Post Widget */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {user?.username?.[0]?.toUpperCase() || "U"}
                </div>
                <button
                  onClick={() => navigate(token ? "/posts/new" : "/login")}
                  className="flex-1 bg-gray-100 hover:bg-gray-200/80 text-left text-gray-500 text-sm font-medium px-4 py-2.5 rounded-full transition cursor-pointer"
                >
                  What's on your mind, {user?.username || "writer"}?
                </button>
              </div>
            </div>

            {/* Main Feed Header */}
            <div className="flex items-center justify-between pt-2">
              <h1 className="text-lg font-bold text-gray-900">Recent Updates</h1>
              <span className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-2.5 py-1 rounded-full">
                Page {page}
              </span>
            </div>

            {/* Feed Cards List */}
            {posts.length === 0 ? (
              <div className="bg-white rounded-xl p-8 text-center border border-gray-200 shadow-xs">
                <p className="text-gray-500 font-medium">No posts available right now.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {/* Pagination Controls */}
            <Pagination page={page} setPage={setPage} canGoNext={posts.length >= limit} />
          </main>

          {/* ================= RIGHT SIDEBAR ================= */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-20 space-y-4">
            {/* Trending Topics Widget */}
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-xs p-4 space-y-3">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <span>🔥</span> Trending Topics
              </h2>
              <div className="space-y-2.5 text-xs">
                <div className="p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                  <p className="font-semibold text-gray-800">#WebDevelopment</p>
                  <p className="text-gray-500">1.2k posts this week</p>
                </div>
                <div className="p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                  <p className="font-semibold text-gray-800">#PrismaORMs</p>
                  <p className="text-gray-500">840 posts</p>
                </div>
                <div className="p-2 hover:bg-gray-50 rounded-lg transition cursor-pointer">
                  <p className="font-semibold text-gray-800">#ReactJS</p>
                  <p className="text-gray-500">2.4k posts</p>
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