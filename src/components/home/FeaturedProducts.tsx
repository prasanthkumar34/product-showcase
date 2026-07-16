import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProductContext } from '../../hooks/useProductContext'
import ProductCard from '../products/ProductCard'
import ProductCardSkeleton from '../products/ProductCardSkeleton'

function pickFeatured<T>(items: T[], count: number): T[] {
  if (items.length <= count) return [...items]
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, count)
}

export default function FeaturedProducts() {
  const { products, loading, error, refetch } = useProductContext()

  const featured = useMemo(() => pickFeatured(products, 4), [products])

  return (
    <section className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            Featured Products
          </h2>
          <Link
            to="/products"
            className="shrink-0 text-sm font-medium text-primary hover:text-indigo-700"
          >
            View All
          </Link>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
