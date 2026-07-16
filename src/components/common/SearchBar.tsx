import { useCallback, useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import { useFilterContext } from '../../hooks/useFilterContext'
import { useDebounce } from '../../hooks/useDebounce'
import { DEBOUNCE_DELAY_MS } from '../../utils/constants'

export default function SearchBar() {
  const { searchTerm, setSearchTerm } = useFilterContext()
  const [value, setValue] = useState(searchTerm)
  const debounced = useDebounce(value, DEBOUNCE_DELAY_MS)

  useEffect(() => {
    if (debounced !== searchTerm) {
      setSearchTerm(debounced)
    }
  }, [debounced, searchTerm, setSearchTerm])

  const clear = useCallback(() => {
    setValue('')
    setSearchTerm('')
  }, [setSearchTerm])

  return (
    <div className="relative w-full min-w-0">
      <label htmlFor="product-search" className="sr-only">
        Search products
      </label>
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        aria-hidden="true"
      />
      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        aria-label="Search products"
        className="min-h-11 w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-12 text-sm text-gray-900 placeholder:text-gray-400"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-1 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-md text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Clear search"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
