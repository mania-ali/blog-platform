// src/pages/EditPost.jsx
import { useParams, useNavigate } from "react-router-dom";
import { usePost, useUpdatePost } from "../hooks/usePosts";
import { useState } from "react";
import Loading from "../components/common/Loading";
import ErrorMessage from "../components/common/Error";

const inputClass =
  "w-full bg-gray-50 border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1877f2] focus:border-transparent transition";

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
    <div className="min-h-screen bg-[#f0f2f5] py-8">
      <div className="max-w-xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold text-gray-600 hover:text-[#1877f2] transition mb-4 inline-block"
        >
          ← Back
        </button>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h1 className="text-xl font-bold text-gray-900 mb-5 border-b border-gray-100 pb-3">
            Edit Post
          </h1>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={inputClass}
            />

            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={6}
              className={`${inputClass} resize-none`}
            />

            <label className="flex items-center gap-2.5 text-sm font-semibold text-gray-700 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="w-4 h-4 text-[#1877f2] rounded border-gray-300 focus:ring-[#1877f2]"
              />
              Publish Post
            </label>

            {displayError && (
              <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 font-medium">
                {displayError}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#1877f2] hover:bg-blue-600 text-white font-semibold py-2.5 rounded-lg transition shadow-xs disabled:opacity-50 text-sm"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}