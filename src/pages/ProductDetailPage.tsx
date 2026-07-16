import { Link, useParams } from 'react-router-dom'
import { PackageX, Star } from 'lucide-react'
import Breadcrumb from '../components/common/Breadcrumb'
import LazyImage from '../components/common/LazyImage'
import SpecsTable from '../components/products/SpecsTable'
import RelatedProducts from '../components/products/RelatedProducts'
import { useProductDetail } from '../hooks/useProductDetail'

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  const hasHalf = rating - full >= 0.5

  return (
    <div className="flex items-center gap-2" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex items-center gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => {
          const filled = i < full || (i === full && hasHalf)
          return (
            <Star
              key={i}
              size={16}
              className={filled ? 'fill-accent text-accent' : 'text-gray-300'}
            />
          )
        })}
      </div>
      <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
    </div>
  )
}

function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10" aria-busy="true" aria-live="polite">
      <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="aspect-square animate-pulse rounded-xl bg-gray-200" />
        <div className="space-y-4">
          <div className="h-5 w-24 animate-pulse rounded-full bg-gray-200" />
          <div className="h-9 w-3/4 max-w-full animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-28 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-24 animate-pulse rounded bg-gray-200" />
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 max-w-full animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
      <div className="mt-12 space-y-3">
        <div className="h-7 w-40 animate-pulse rounded bg-gray-200" />
        <div className="h-40 animate-pulse rounded-xl bg-gray-200" />
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id: idParam } = useParams<{ id: string }>()
  const productId = Number(idParam)
  const { product, loading, error } = useProductDetail(productId)

  if (loading) return <DetailSkeleton />

  if (error || !product) {
    return (
      <div
        role="alert"
        className="mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center md:px-6"
      >
        <PackageX size={48} className="text-gray-400" aria-hidden="true" />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Product not found</h1>
        <p className="mt-2 max-w-md text-sm text-gray-600">
          {error === 'Product not found'
            ? "We couldn't find that product. It may have been removed or the link is incorrect."
            : (error ?? 'Something went wrong.')}
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Back to products
        </Link>
      </div>
    )
  }

  const inStock = product.stock > 0

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <Breadcrumb
        items={[
          { label: 'Home', path: '/' },
          { label: 'Products', path: '/products' },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <LazyImage
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            className="aspect-square w-full"
          />
        </div>

        <div className="min-w-0">
          <span className="inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
            {product.category}
          </span>
          <h1 className="mt-3 break-words text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <div className="mt-3">
            <StarRating rating={product.rating} />
          </div>
          <p
            className={[
              'mt-3 text-sm font-medium',
              inStock ? 'text-green-700' : 'text-red-600',
            ].join(' ')}
          >
            {inStock ? `In Stock (${product.stock})` : 'Out of Stock'}
          </p>
          <p className="mt-6 text-base leading-relaxed break-words text-gray-700">
            {product.longDescription}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <SpecsTable specs={product.specs} />
      </div>

      <div className="mt-12">
        <RelatedProducts category={product.category} excludeId={product.id} />
      </div>
    </div>
  )
}
