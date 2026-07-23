import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePost } from "../hooks/usePosts";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function NewPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const { mutate, isPending, error } = useCreatePost();

  const validate = () => {
    if (!title.trim()) return "Title is required.";
    if (title.trim().length < 3) return "Title must be at least 3 characters.";
    if (!body.trim()) return "Post content is required.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validate();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setFormError(null);
    mutate(
      { title, body },
      { onSuccess: () => navigate("/dashboard") }
    );
  };

  const backendError =
    error?.response?.data?.errors?.[0]?.msg ||
    error?.response?.data?.message ||
    (error && "Failed to create post. Please try again.");

  const displayError = formError || backendError;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">New post</h1>

        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />

          <textarea
            placeholder="Write your post..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className={`${inputClass} resize-none`}
          />

          {displayError && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
              {displayError}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition disabled:opacity-50"
          >
            {isPending ? "Publishing..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}