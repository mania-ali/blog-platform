import { useParams, useNavigate } from "react-router-dom";
import { usePost, useUpdatePost } from "../hooks/usePosts";
import { useState } from "react";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/Error";

const inputClass =
  "w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";

export default function EditPost() {
  const { id } = useParams();
  const { data, isLoading, error } = usePost(id);

  if (isLoading) return <Loading message="Loading post..." />;
  if (error) return <ErrorMessage message="Couldn't load this post." />;

  return <EditPostForm key={data.post.id} post={data.post} />;
}

function EditPostForm({ post }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate, isPending, error } = useUpdatePost();

  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [published, setPublished] = useState(post.published);
  const [formError, setFormError] = useState(null);

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
      { id, postData: { title, body, published } },
      { onSuccess: () => navigate("/dashboard") }
    );
  };

  const backendError =
    error?.response?.data?.errors?.[0]?.msg ||
    error?.response?.data?.message ||
    (error && "Failed to update post.");

  const displayError = formError || backendError;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit post</h1>

        <form onSubmit={handleSubmit} noValidate className="bg-white rounded-xl shadow-sm p-6 space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
          />

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={8}
            className={`${inputClass} resize-none`}
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
            {isPending ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );
}