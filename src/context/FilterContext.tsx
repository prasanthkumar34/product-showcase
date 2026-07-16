import { createContext, useState, type ReactNode } from 'react'

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
  const [currentPage, setCurrentPage] = useState(1)

  function setSearchTerm(term: string) {
    setSearchTermState(term)
    setCurrentPage(1)
  }

  function setSelectedCategory(category: string) {
    setSelectedCategoryState(category)
    setCurrentPage(1)
  }

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
