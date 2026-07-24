import { Link, useNavigate } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import { useDeletePost } from "../../hooks/usePosts";

export default function PostCard({ post, showOwnerActions = false }) {
  const navigate = useNavigate();
  const { mutate: removePost, isPending: isDeleting } = useDeletePost();

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Delete this post? This can't be undone.")) {
      removePost(post.id);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/posts/edit/${post.id}`);
  };

  return (
    <Link
      to={`/posts/${post.id}`}
      className="block bg-white rounded-xl border border-gray-200/80 shadow-sm hover:bg-gray-200/80 transition-colors duration-200 overflow-hidden group"
    >
      <div className="px-4 pt-4 pb-2">
        <PostHeader post={post} />
      </div>

      <div className="px-4 py-2">
        <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#1877f2] transition-colors mb-1.5 leading-snug">
          {post.title}
        </h2>
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
          {post.body}
        </p>
      </div>

      {showOwnerActions && (
        <div className="border-t border-gray-100 px-4 py-2 flex items-center justify-end gap-3 text-sm bg-gray-50/50">
          <button
            onClick={handleEdit}
            className="text-gray-600 hover:text-blue-600 font-semibold px-3 py-1 rounded-md hover:bg-gray-100 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-700 font-semibold px-3 py-1 rounded-md hover:bg-red-50 transition disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      {!showOwnerActions && <PostActions />}
    </Link>
  );
}