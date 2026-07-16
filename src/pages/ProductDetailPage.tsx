import Breadcrumb from '../components/common/Breadcrumb'
import SpecsTable from '../components/products/SpecsTable'
import RelatedProducts from '../components/products/RelatedProducts'

const ProductDetailPage = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:px-6">
      <Breadcrumb />
      <div className="rounded-lg border border-dashed border-primary/30 bg-white px-6 py-16 text-center text-sm font-semibold text-primary">
        ProductDetailPage
      </div>
      <SpecsTable />
      <RelatedProducts />
    </div>
  )
}

export default ProductDetailPage
