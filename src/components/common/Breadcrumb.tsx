import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

type Crumb = {
  label: string
  path?: string
}

type BreadcrumbProps = {
  items: Crumb[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 && (
                <ChevronRight size={14} className="shrink-0 text-gray-400" aria-hidden="true" />
              )}
              {isLast || !item.path ? (
                <span
                  className="font-medium text-gray-900"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <Link to={item.path} className="hover:text-primary">
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
