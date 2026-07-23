import { Link, useNavigate } from "react-router-dom";
import { useUserPosts } from "../hooks/usePosts";
import { getUserIdFromToken } from "../utils/decodeToken";
import { useAuth } from "../hooks/useAuth";
import PostCard from "../components/posts/PostCard";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/Error";

export default function Dashboard() {
  const { token, logout } = useAuth();
  const userId = getUserIdFromToken(token);
  const navigate = useNavigate();

  const { data, isLoading, error } = useUserPosts(userId);

  const handleLogout = () => {
    navigate("/login", { replace: true }); // navigate first
    logout();                          // then clear the token
  };

if (isLoading) return <Loading message="Loading post..." />;
if (error) return <ErrorMessage message="Post not found." />;

  const posts = data.posts;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Your posts</h1>
          <div className="flex items-center gap-3">
            <Link
              to="/posts/new"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full transition"
            >
              New post
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm font-medium text-gray-600 hover:text-red-600 px-3 py-2"
            >
              Log out
            </button>
          </div>
        </div>

        {posts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <p className="text-gray-500 mb-4">You haven't posted anything yet.</p>
            <Link
              to="/posts/new"
              className="text-blue-600 hover:underline font-medium"
            >
              Write your first post
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {posts.map(post => (
            <PostCard key={post.id} post={post} showOwnerActions />
          ))}
        </div>
      </div>
    </div>
  );
}