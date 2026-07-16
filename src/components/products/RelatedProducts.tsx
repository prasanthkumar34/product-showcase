import { useRelatedProducts } from '../../hooks/useRelatedProducts'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'
import ErrorMessage from '../common/ErrorMessage'

type RelatedProductsProps = {
  category: string
  excludeId: number
}

export default function RelatedProducts({ category, excludeId }: RelatedProductsProps) {
  const { relatedProducts, loading, error } = useRelatedProducts(category, excludeId)

  if (loading) {
    return (
      <section>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Related Products</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">Related Products</h2>
        <div className="mt-6">
          <ErrorMessage message={error} />
        </div>
      </section>
    )
  }

  if (relatedProducts.length === 0) return null

  return (
    <section>
      <h2 className="text-xl font-bold tracking-tight text-gray-900">Related Products</h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
