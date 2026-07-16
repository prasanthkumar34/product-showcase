import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed border-red-300 bg-red-50 px-6 py-16 text-center">
      <p className="text-lg font-semibold text-red-600">NotFoundPage</p>
      <Link to="/" className="text-sm font-medium text-primary underline">
        Go home
      </Link>
    </div>
  )
}

export default NotFoundPage
