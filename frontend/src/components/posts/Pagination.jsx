export default function Pagination({ page, setPage, canGoNext }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 pb-10">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-5 py-2 rounded-lg bg-white border border-gray-300 text-sm font-semibold text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 shadow-sm transition"
      >
        ← Previous
      </button>
      <span className="text-sm font-bold text-gray-600 bg-gray-200/60 px-3.5 py-1.5 rounded-md">
        Page {page}
      </span>
      <button
        onClick={() => setPage((p) => p + 1)}
        disabled={!canGoNext}
        className="px-5 py-2 rounded-lg bg-[#1877f2] text-white text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-600 shadow-sm transition"
      >
        Next →
      </button>
    </div>
  );
}