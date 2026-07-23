import { useParams, useNavigate} from "react-router-dom";
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

      <div className="text-center mt-10">
        <p className="text-red-500">Post not found.</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline mt-2 inline-block"
        >
          Go back
        </button>
      </div>
    );

  const post = data.post;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4 inline-block"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 pt-5">
            <PostHeader post={post} />
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                post.published
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
          </div>

          <div className="px-5 py-4">
            <p className="text-xs text-gray-400 mb-1">Post #{post.id}</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{post.title}</h1>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {post.body}
            </p>
          </div>

          <PostActions />
        </div>
      </div>
    </div>
  );
}