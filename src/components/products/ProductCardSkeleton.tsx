import { memo } from 'react'

function ProductCardSkeleton() {
  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
      aria-hidden="true"
    >
      <div className="aspect-square w-full animate-pulse bg-gray-200" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-5 w-24 animate-pulse rounded-full bg-gray-200" />
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-auto h-5 w-16 animate-pulse rounded bg-gray-200" />
      </div>
    </div>
  )
}

export default memo(ProductCardSkeleton)
