import { useEffect, useRef } from 'react'
import SearchBar from '../components/common/SearchBar'
import Pagination from '../components/common/Pagination'
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

  function handlePageChange(page: number) {
    setCurrentPage(page)
    gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">All Products</h1>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
        <div className="md:max-w-md md:flex-1">
          <SearchBar />
        </div>
        <div className="min-w-0 flex-1">
          <CategoryFilter />
        </div>
      </div>

      {error && !loading ? (
        <div className="mt-10 rounded-xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-gray-600">
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
