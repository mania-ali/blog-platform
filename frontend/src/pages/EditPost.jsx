import { useParams, useNavigate } from "react-router-dom";
import { usePost, useUpdatePost } from "../hooks/usePosts";
import { useState } from "react";
export default function EditPost() {
  const { id } = useParams();
  const { data, isLoading } = usePost(id);

  if (isLoading) return <p className="text-center text-gray-500 mt-10">Loading post...</p>;

  // key forces a fresh mount of EditPostForm whenever the post id changes,
  // so its internal useState correctly initializes from the fetched post
  return <EditPostForm key={data.post.id} post={data.post} />;
}

function EditPostForm({ post }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate, isPending, error } = useUpdatePost();

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [published, setPublished] = useState(post.published);

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { id, postData: { title, body, published } },
      { onSuccess: () => navigate("/dashboard") }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit post</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="rounded"
            />
            Published
          </label>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
              {error.response?.data?.message || "Failed to update post."}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition disabled:opacity-50"
          >
            {isPending ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}