import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ErrorBoundary from './components/common/ErrorBoundary'
import Loader from './components/common/Loader'
import { ProductProvider } from './context/ProductContext'
import { FilterProvider } from './context/FilterContext'

const HomePage = lazy(() => import('./pages/HomePage'))
const ProductListingPage = lazy(() => import('./pages/ProductListingPage'))
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <ErrorBoundary>
      <ProductProvider>
        <FilterProvider>
          <div className="flex min-h-screen flex-col bg-background font-sans">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<Loader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductListingPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </FilterProvider>
      </ProductProvider>
    </ErrorBoundary>
  )
}
