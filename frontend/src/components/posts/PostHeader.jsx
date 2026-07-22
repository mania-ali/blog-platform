export default function PostHeader({ post }) {
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm shrink-0">
        {post.author?.name?.[0]?.toUpperCase() || "U"}
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">
          {post.author?.name || "Unknown author"}
        </p>
        <p className="text-xs text-gray-400">{formattedDate}</p>
      </div>
    </div>
  );
}