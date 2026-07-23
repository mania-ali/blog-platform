export default function AuthForm({ title, subtitle, fields, error, loading, onSubmit, footer }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm w-full max-w-sm p-8">
        <h1 className="text-2xl font-bold text-blue-600 text-center mb-1">Scribble</h1>
        <p className="text-sm text-gray-500 text-center mb-6">{subtitle}</p>

       <form onSubmit={onSubmit} noValidate className="space-y-4">
          {fields}

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-md px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-full transition disabled:opacity-50"
          >
            {loading ? "Please wait..." : title}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-5">{footer}</div>
      </div>
    </div>
  );
}