import { PackageOpen } from 'lucide-react'
import type { Product } from '../../types/product'
import ProductCard from './ProductCard'
import ProductCardSkeleton from './ProductCardSkeleton'

type ProductGridProps = {
  products: Product[]
  loading: boolean
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 12 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
        <PackageOpen size={40} className="text-gray-400" aria-hidden="true" />
        <p className="mt-4 text-base font-semibold text-gray-900">No products found</p>
        <p className="mt-1 text-sm text-gray-600">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
