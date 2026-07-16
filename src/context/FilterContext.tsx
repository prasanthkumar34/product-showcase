import { createContext, useCallback, useState, type ReactNode } from 'react'

type FilterContextValue = {
  searchTerm: string
  selectedCategory: string
  currentPage: number
  setSearchTerm: (term: string) => void
  setSelectedCategory: (category: string) => void
  setCurrentPage: (page: number) => void
}

export const FilterContext = createContext<FilterContextValue | null>(null)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [searchTerm, setSearchTermState] = useState('')
  const [selectedCategory, setSelectedCategoryState] = useState('')
  const [currentPage, setCurrentPageState] = useState(1)

  const setSearchTerm = useCallback((term: string) => {
    setSearchTermState(term)
    setCurrentPageState(1)
  }, [])

  const setSelectedCategory = useCallback((category: string) => {
    setSelectedCategoryState(category)
    setCurrentPageState(1)
  }, [])

  const setCurrentPage = useCallback((page: number) => {
    setCurrentPageState(page)
  }, [])

  return (
    <FilterContext.Provider
      value={{
        searchTerm,
        selectedCategory,
        currentPage,
        setSearchTerm,
        setSelectedCategory,
        setCurrentPage,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
