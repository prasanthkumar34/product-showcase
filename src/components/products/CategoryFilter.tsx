import { useFilterContext } from '../../hooks/useFilterContext'
import { CATEGORIES } from '../../utils/constants'

const options = ['All', ...CATEGORIES]

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useFilterContext()
  const active = !selectedCategory || selectedCategory === 'All' ? 'All' : selectedCategory

  return (
    <div
      className="flex gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible"
      role="group"
      aria-label="Filter by category"
    >
      {options.map((category) => {
        const pressed = active === category
        return (
          <button
            key={category}
            type="button"
            aria-pressed={pressed}
            onClick={() => setSelectedCategory(category === 'All' ? '' : category)}
            className={[
              'shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors',
              pressed
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300',
            ].join(' ')}
          >
            {category}
          </button>
        )
      })}
    </div>
  )
}
