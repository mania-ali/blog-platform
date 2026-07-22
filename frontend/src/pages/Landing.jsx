import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">Scribble</span>

          <nav className="flex items-center gap-3">
            <Link
              to="/feed"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              Feed
            </Link>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-700 hover:text-blue-600 px-3 py-2"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full"
            >
              Sign up
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center">
        <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Write. Share. <span className="text-blue-600">Be read.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Scribble is a simple space to publish your thoughts and discover
              what everyone else is writing about — no clutter, just posts.
            </p>
            <div className="flex gap-4">
              <Link
                to="/feed"
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition"
              >
                Browse the feed
              </Link>
              <Link
                to="/register"
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-6 py-3 rounded-full transition"
              >
                Get started
              </Link>
            </div>
          </div>

          {/* Simple visual placeholder — mimics a feed card */}
          <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100" />
                <div className="flex-1 space-y-2">
                  <div className="h-2.5 bg-gray-200 rounded w-1/3" />
                  <div className="h-2 bg-gray-100 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-400 py-6">
        Built as a full-stack capstone project.
      </footer>
    </div>
  );
}