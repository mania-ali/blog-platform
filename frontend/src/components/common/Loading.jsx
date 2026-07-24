export default function Loading({ message = "Loading..." }) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
      <div className="w-8 h-8 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
}