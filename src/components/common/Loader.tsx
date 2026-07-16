export default function Loader() {
  return (
    <div
      className="flex min-h-[40vh] items-center justify-center px-4 py-16"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-3">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary"
          aria-hidden="true"
        />
        <p className="text-sm text-gray-600">Loading…</p>
      </div>
    </div>
  )
}
