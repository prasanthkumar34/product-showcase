import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-[#312e81]">
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/4 h-80 w-80 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-16 text-center sm:py-20 md:px-6 md:py-28">
        <h1 className="max-w-full break-words text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Product Showcase
        </h1>
        <p className="mt-4 max-w-2xl text-xl font-medium text-indigo-50 md:text-2xl">
          Shop across categories without the clutter
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-indigo-100 md:text-lg">
          Electronics, home, fashion, sports, books, and games — one catalog with clear specs,
          honest descriptions, and prices you can compare at a glance.
        </p>
        <Link
          to="/products"
          className="mt-8 inline-flex min-h-11 items-center justify-center rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-amber-400"
        >
          Shop Now
        </Link>
      </div>
    </section>
  )
}
