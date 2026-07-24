export default function PostHeader({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
          {post.author?.username?.[0]?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 leading-tight hover:underline cursor-pointer">
            {post.author?.username || "Unknown author"}
          </p>
          <p className="text-xs text-gray-500 font-normal mt-0.5">{formattedDate}</p>
        </div>
      </div>

      <button className="text-gray-400 hover:bg-gray-100 p-1.5 rounded-full transition">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </button>
    </div>
  );
}