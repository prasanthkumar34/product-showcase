import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { hasError: boolean }

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="mx-auto max-w-lg px-4 py-16 text-center"
        >
          <h1 className="text-xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-2 text-sm text-gray-600">
            An unexpected error occurred. Refresh the page to try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Refresh page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
