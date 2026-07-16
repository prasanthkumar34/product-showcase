import { memo } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../../types/product'
import LazyImage from '../common/LazyImage'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-md"
    >
      <LazyImage
        src={product.image}
        alt={product.name}
        className="aspect-square w-full"
      />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="w-fit rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
          {product.category}
        </span>
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary">
          {product.name}
        </h3>
        <p className="line-clamp-2 flex-1 text-sm text-gray-600">{product.shortDescription}</p>
        <p className="text-base font-semibold text-gray-900">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  )
}

export default memo(ProductCard)
