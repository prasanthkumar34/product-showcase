import { Link } from 'react-router-dom'
import { Code2, Briefcase, Mail } from 'lucide-react'
import { APP_NAME } from '../../utils/constants'
import logo from '../../assets/logo.svg'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <img src={logo} alt="" width={28} height={28} className="h-7 w-7" />
            <span className="font-semibold text-gray-900">{APP_NAME}</span>
          </div>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-gray-600">
            A curated catalog across electronics, home, fashion, and more — built for browsing without the noise.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">Quick links</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/" className="text-gray-600 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="text-gray-600 hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <a href="#about" className="text-gray-600 hover:text-primary">
                About
              </a>
            </li>
            <li>
              <a href="mailto:hello@productshowcase.example" className="text-gray-600 hover:text-primary">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">Connect</p>
          <div className="mt-3 flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-primary"
              aria-label="GitHub"
            >
              <Code2 size={18} aria-hidden="true" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-primary"
              aria-label="LinkedIn"
            >
              <Briefcase size={18} aria-hidden="true" />
            </a>
            <a
              href="mailto:hello@productshowcase.example"
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-primary"
              aria-label="Email"
            >
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-100">
        <p className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-gray-500 md:px-6 md:text-left">
          © {year} {APP_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
