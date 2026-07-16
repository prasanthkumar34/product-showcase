import { createContext, type ReactNode } from 'react'

export interface FilterContextValue {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export const FilterContext = createContext<FilterContextValue | undefined>(undefined)

interface FilterProviderProps {
  children: ReactNode
}

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const value: FilterContextValue = {
    searchQuery: '',
    setSearchQuery: () => {},
    selectedCategory: '',
    setSelectedCategory: () => {},
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}
