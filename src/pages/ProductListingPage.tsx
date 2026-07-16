import { useCallback, useEffect, useRef } from 'react'
import SearchBar from '../components/common/SearchBar'
import Pagination from '../components/common/Pagination'
import ErrorMessage from '../components/common/ErrorMessage'
import CategoryFilter from '../components/products/CategoryFilter'
import ProductGrid from '../components/products/ProductGrid'
import { useProductContext } from '../hooks/useProductContext'
import { useFilterContext } from '../hooks/useFilterContext'
import { useFilteredProducts } from '../hooks/useFilteredProducts'

export default function ProductListingPage() {
  const { loading, error, refetch } = useProductContext()
  const { currentPage, setCurrentPage } = useFilterContext()
  const { paginatedProducts, totalPages, totalResults } = useFilteredProducts()
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!loading && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [loading, currentPage, totalPages, setCurrentPage])

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    [setCurrentPage],
  )

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">All Products</h1>

      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
        <div className="w-full min-w-0 lg:max-w-md lg:flex-1">
          <SearchBar />
        </div>
        <div className="min-w-0 flex-1">
          <CategoryFilter />
        </div>
      </div>

      {error && !loading ? (
        <div className="mt-10">
          <ErrorMessage message={error} onRetry={() => void refetch()} />
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-gray-600" aria-live="polite">
            {loading
              ? 'Loading products…'
              : `Showing ${paginatedProducts.length} of ${totalResults} products`}
          </p>

          <div ref={gridRef} className="mt-4 scroll-mt-24">
            <ProductGrid products={paginatedProducts} loading={loading} />
          </div>

          {!loading && totalPages > 1 && (
            <div className="mt-10">
              <Pagination
                currentPage={Math.min(currentPage, totalPages)}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
