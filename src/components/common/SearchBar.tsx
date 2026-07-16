import { useEffect, useState } from 'react'
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

  function clear() {
    setValue('')
    setSearchTerm('')
  }

  return (
    <div className="relative w-full">
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
        className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      />
      {value && (
        <button
          type="button"
          onClick={clear}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          aria-label="Clear search"
        >
          <X size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
