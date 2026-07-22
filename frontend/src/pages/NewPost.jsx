import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../hooks/usePosts";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  const { mutate, isPending, error } = useCreatePost();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(
      { title, body },
      {
        onSuccess: () => navigate("/dashboard"),
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">New post</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            placeholder="Write your post..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={8}
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
              {error.response?.data?.message || "Failed to create post."}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition disabled:opacity-50"
          >
            {isPending ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}