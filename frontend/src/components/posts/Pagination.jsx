export default function Pagination({ page, setPage, canGoNext }) {
  return (
    <div className="flex items-center justify-center gap-4 mt-8 pb-8">
      <button
        onClick={() => setPage(p => Math.max(p - 1, 1))}
        disabled={page === 1}
        className="px-4 py-2 rounded-full bg-white border border-gray-300 text-sm font-medium text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
      >
        Previous
      </button>
      <span className="text-sm text-gray-600 font-medium">Page {page}</span>
      <button
        onClick={() => setPage(p => p + 1)}
        disabled={!canGoNext}
        className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
}