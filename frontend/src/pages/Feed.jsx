import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePublishedPosts } from "../hooks/usePosts";
import PostCard from "../components/posts/PostCard";
import Pagination from "../components/posts/Pagination";

export default function Feed() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const navigate = useNavigate();

  const { data, isLoading, error } = usePublishedPosts(page, limit);

  if (isLoading) return <p className="text-center text-gray-500 mt-10">Loading posts...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Something went wrong loading posts.</p>;

  const posts = data.posts;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Latest posts</h1>

        {posts.length === 0 && <p className="text-gray-500 text-center">No posts yet.</p>}

        <div className="space-y-4">
          {posts.map(post => <PostCard key={post.id} post={post} />)}
        </div>

        <Pagination page={page} setPage={setPage} canGoNext={posts.length >= limit} />
      </div>
    </div>
  );
}