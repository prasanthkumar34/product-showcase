import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center md:px-6">
      <div className="w-full rounded-lg border border-dashed border-red-300 bg-red-50 px-6 py-16">
        <p className="text-lg font-semibold text-red-600">NotFoundPage</p>
        <Link to="/" className="mt-4 inline-block text-sm font-medium text-primary underline">
          Go home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundPage
