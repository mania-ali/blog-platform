import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../api/postApi";
import PostHeader from "../components/posts/PostHeader";
import PostActions from "../components/posts/PostActions";
import Loading from "../components/common/Loading";

export default function PostView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPostById(id),
  });

  if (isLoading) return <Loading message="Loading post..." />;

  if (error)
    return (
      <div className="text-center mt-12">
        <p className="text-red-500 font-semibold">Post not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-[#1877f2] hover:underline font-semibold mt-2 inline-block text-sm"
        >
          Go back
        </button>
      </div>
    );

  const post = data.post;

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-6">
      <div className="max-w-xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-gray-600 hover:text-[#1877f2] transition mb-4 inline-block"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5 pb-2">
            <PostHeader post={post} />
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                post.published
                  ? "bg-green-50 text-green-700 border-green-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
          </div>

          <div className="px-5 py-3">
            <h1 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h1>
            <p className="text-gray-800 text-sm whitespace-pre-wrap leading-relaxed">
              {post.body}
            </p>
          </div>

          <PostActions />
        </div>
      </div>
    </div>
  );
}