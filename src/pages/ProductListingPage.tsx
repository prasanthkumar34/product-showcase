import SearchBar from '../components/common/SearchBar'
import Pagination from '../components/common/Pagination'
import CategoryFilter from '../components/products/CategoryFilter'
import ProductGrid from '../components/products/ProductGrid'

const ProductListingPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-lg border border-dashed border-primary/30 bg-white px-4 py-3 text-center text-sm font-semibold text-primary">
        ProductListingPage
      </div>
      <SearchBar />
      <div className="grid gap-6 md:grid-cols-[240px_1fr]">
        <CategoryFilter />
        <ProductGrid />
      </div>
      <Pagination />
    </div>
  )
}

export default ProductListingPage
