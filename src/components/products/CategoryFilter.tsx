import { memo, useCallback } from 'react'
import { useFilterContext } from '../../hooks/useFilterContext'
import { CATEGORIES } from '../../utils/constants'

const options = ['All', ...CATEGORIES]

type ChipProps = {
  category: string
  pressed: boolean
  onSelect: (category: string) => void
}

const CategoryChip = memo(function CategoryChip({ category, pressed, onSelect }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={() => onSelect(category)}
      className={[
        'min-h-11 shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors',
        pressed
          ? 'bg-primary text-white'
          : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50 hover:ring-gray-300',
      ].join(' ')}
    >
      {category}
    </button>
  )
})

function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useFilterContext()
  const active = !selectedCategory || selectedCategory === 'All' ? 'All' : selectedCategory

  const handleSelect = useCallback(
    (category: string) => {
      setSelectedCategory(category === 'All' ? '' : category)
    },
    [setSelectedCategory],
  )

  return (
    <div
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden"
      role="group"
      aria-label="Filter by category"
    >
      {options.map((category) => (
        <CategoryChip
          key={category}
          category={category}
          pressed={active === category}
          onSelect={handleSelect}
        />
      ))}
    </div>
  )
}

export default memo(CategoryFilter)
