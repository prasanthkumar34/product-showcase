import { useNavigate } from 'react-router-dom'

export default function HeroSection() {
  const navigate = useNavigate()

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

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center md:px-6 md:py-28">
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
          Product Showcase
        </h1>
        <p className="mt-4 max-w-2xl text-xl font-medium text-indigo-50 md:text-2xl">
          Shop across categories without the clutter
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-indigo-100 md:text-lg">
          Electronics, home, fashion, sports, books, and games — one catalog with clear specs,
          honest descriptions, and prices you can compare at a glance.
        </p>
        <button
          type="button"
          onClick={() => navigate('/products')}
          className="mt-8 rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-gray-900 transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Shop Now
        </button>
      </div>
    </section>
  )
}
