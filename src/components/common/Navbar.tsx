import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { APP_NAME } from '../../utils/constants'
import logo from '../../assets/logo.svg'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'min-h-11 rounded-md px-3 py-2 text-sm font-medium transition-colors inline-flex items-center',
    isActive ? 'bg-primary/10 text-primary' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
  ].join(' ')

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 md:px-6" aria-label="Main">
        <Link
          to="/"
          className="flex min-h-11 min-w-0 items-center gap-2.5 text-gray-900"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt={`${APP_NAME} logo`} width={32} height={32} className="h-8 w-8 shrink-0" />
          <span className="truncate text-base font-semibold tracking-tight">{APP_NAME}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Products
          </NavLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-nav" className="border-t border-gray-100 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            <NavLink to="/" end className={linkClass} onClick={() => setOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/products" className={linkClass} onClick={() => setOpen(false)}>
              Products
            </NavLink>
          </div>
        </div>
      )}
    </header>
  )
}
