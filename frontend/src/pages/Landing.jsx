import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-2xl font-black text-[#1877f2] tracking-tight">Scribble</span>

          <nav className="flex items-center gap-2">
            <Link
              to="/feed"
              className="text-sm font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            >
              Feed
            </Link>
            <Link
              to="/login"
              className="text-sm font-semibold text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm font-semibold text-white bg-[#1877f2] hover:bg-blue-600 px-4 py-2 rounded-lg shadow-xs transition"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight mb-4 tracking-tight">
              Connect & share <br />
              <span className="text-[#1877f2]">your thoughts.</span>
            </h1>
            <p className="text-base text-gray-600 mb-8 leading-relaxed max-w-md">
              Scribble provides a clean, social space to publish your posts, read updates from others, and share ideas effortlessly.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/feed"
                className="bg-[#1877f2] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition"
              >
                Browse Feed
              </Link>
              <Link
                to="/register"
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-semibold px-6 py-3 rounded-lg transition shadow-xs"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Social Card Preview Visual */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-5 space-y-4">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <div className="w-10 h-10 rounded-full bg-[#1877f2] text-white flex items-center justify-center font-bold">
                S
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Scribble Team</p>
                <p className="text-xs text-gray-400">Just now</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded-full w-3/4" />
              <div className="h-3 bg-gray-100 rounded-full w-full" />
              <div className="h-3 bg-gray-100 rounded-full w-2/3" />
            </div>
            <div className="border-t border-gray-100 pt-3 flex justify-around text-xs font-semibold text-gray-400">
              <span>👍 Like</span>
              <span>💬 Comment</span>
              <span>↗ Share</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs font-medium text-gray-500 py-6 border-t border-gray-200/60 bg-white">
        Built as a full-stack capstone project.
      </footer>
    </div>
  );
}