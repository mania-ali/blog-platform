export default function AuthForm({ title, subtitle, fields, error, loading, onSubmit, footer }) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-xl shadow-md border border-gray-100 w-full max-w-md p-8">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-[#1877f2] tracking-tight mb-1">
            Scribble
          </h1>
          <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-4">
          {fields}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3 text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1877f2] hover:bg-blue-600 active:scale-[0.99] text-white font-semibold py-2.5 rounded-lg transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
                Please wait...
              </span>
            ) : (
              title
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6 pt-5 border-t border-gray-100">
          {footer}
        </div>
      </div>
    </div>
  );
}