import { useMemo } from 'react'
import { useProductContext } from './useProductContext'
import { useFilterContext } from './useFilterContext'
import { PRODUCTS_PER_PAGE } from '../utils/constants'

export function useFilteredProducts() {
  const { products } = useProductContext()
  const { searchTerm, selectedCategory, currentPage } = useFilterContext()

  return useMemo(() => {
    let filtered = products

    if (selectedCategory && selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    const q = searchTerm.trim().toLowerCase()
    if (q) {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q))
    }

    const totalResults = filtered.length
    const totalPages = Math.max(1, Math.ceil(totalResults / PRODUCTS_PER_PAGE))
    const page = Math.min(currentPage, totalPages)
    const start = (page - 1) * PRODUCTS_PER_PAGE

    return {
      paginatedProducts: filtered.slice(start, start + PRODUCTS_PER_PAGE),
      totalPages,
      totalResults,
    }
  }, [products, searchTerm, selectedCategory, currentPage])
}
