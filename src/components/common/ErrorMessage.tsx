type ErrorMessageProps = {
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center"
    >
      <p className="text-sm text-red-700">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 min-h-11 rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Retry
        </button>
      )}
    </div>
  )
}
