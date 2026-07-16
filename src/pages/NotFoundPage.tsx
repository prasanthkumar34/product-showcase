import { Link } from 'react-router-dom'
import { PackageX } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center md:px-6">
      <PackageX size={48} className="text-gray-400" aria-hidden="true" />
      <h1 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-gray-600">
        That page does not exist. Head back home or browse the product catalog.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Go home
        </Link>
        <Link
          to="/products"
          className="inline-flex min-h-11 items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50"
        >
          Browse products
        </Link>
      </div>
    </div>
  )
}
