import { Truck, ShieldCheck, Headphones } from 'lucide-react'

const values = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Orders leave the warehouse within two business days on most in-stock items.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assured',
    description: 'We list real specs and stock counts so you know what you are buying.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description: 'Reach us any time for order questions, returns, or product advice.',
  },
]

export default function CompanyIntro() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">About us</h2>
        <p className="mt-4 text-base leading-relaxed text-gray-600 md:text-lg">
          Product Showcase started as a small catalog for people who want useful gear without
          scrolling through endless lookalike listings. We stock six categories — from earbuds and
          appliances to notebooks and board games — and keep product pages short, specific, and
          easy to scan.
        </p>
      </div>

      <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {values.map(({ icon: Icon, title, description }) => (
          <li
            key={title}
            className="rounded-xl border border-gray-200 bg-white p-6 text-left shadow-sm"
          >
            <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-2.5 text-primary">
              <Icon size={22} aria-hidden="true" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
