import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ErrorBoundary from './components/common/ErrorBoundary'
import HomePage from './pages/HomePage'
import ProductListingPage from './pages/ProductListingPage'
import ProductDetailPage from './pages/ProductDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import { ProductProvider } from './context/ProductContext'
import { FilterProvider } from './context/FilterContext'

const App = () => {
  return (
    <ErrorBoundary>
      <ProductProvider>
        <FilterProvider>
          <div className="flex min-h-screen flex-col bg-background font-sans">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductListingPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </FilterProvider>
      </ProductProvider>
    </ErrorBoundary>
  )
}

export default App
