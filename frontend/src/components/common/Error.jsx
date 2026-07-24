import { useNavigate } from "react-router-dom";

export default function Error({
  message = "Something went wrong.",
  showBack = true,
  onRetry,
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 text-center px-4">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
        <span className="text-red-600 text-xl font-bold">!</span>
      </div>

      <p className="text-gray-700 font-medium">{message}</p>

      <div className="flex items-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-full transition"
          >
            Try again
          </button>
        )}
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}