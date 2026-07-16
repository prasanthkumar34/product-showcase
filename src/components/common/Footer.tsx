import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { APP_NAME } from '../../utils/constants'
import logo from '../../assets/logo.svg'

const year = new Date().getFullYear()

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-[1.2fr_1fr_1fr] md:px-6">
        <div>
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              alt={`${APP_NAME} logo`}
              width={28}
              height={28}
              className="h-7 w-7"
            />
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
              <Link to="/" className="inline-flex min-h-11 items-center text-gray-600 hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link to="/products" className="inline-flex min-h-11 items-center text-gray-600 hover:text-primary">
                Products
              </Link>
            </li>
            <li>
              <a href="#about" className="inline-flex min-h-11 items-center text-gray-600 hover:text-primary">
                About
              </a>
            </li>
            {/* <li>
              <a
                href="mailto:hello@productshowcase.example"
                className="inline-flex min-h-11 items-center text-gray-600 hover:text-primary"
              >
                Contact
              </a>
            </li> */}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">Connect</p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </a>
            <a
              href="mailto:hello@productshowcase.example"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary"
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
