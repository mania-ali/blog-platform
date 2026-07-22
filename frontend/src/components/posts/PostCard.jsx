import { Link, useNavigate } from "react-router-dom";
import PostHeader from "./PostHeader";
import PostActions from "./PostActions";
import { useDeletePost } from "../../hooks/usePosts";

export default function PostCard({ post, showOwnerActions = false }) {
  const navigate = useNavigate();
  const { mutate: removePost, isPending: isDeleting } = useDeletePost();

  const handleDelete = (e) => {
    e.preventDefault(); // don't trigger the Link navigation
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
      className="block bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
    >
      <div className="px-4 pt-4">
        <PostHeader post={post} />
      </div>
      <div className="px-4 py-3">
        <h2 className="text-base font-semibold text-gray-900 mb-1">{post.title}</h2>
        <p className="text-sm text-gray-700 line-clamp-3">{post.body}</p>
      </div>

      {showOwnerActions && (
        <div className="border-t border-gray-100 px-4 py-2 flex items-center gap-4 text-sm">
          <button
            onClick={handleEdit}
            className="text-blue-600 hover:underline font-medium"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-600 hover:underline font-medium disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}

      {!showOwnerActions && <PostActions />}
    </Link>
  );
}