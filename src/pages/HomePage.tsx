import HeroSection from '../components/home/HeroSection'
import CompanyIntro from '../components/home/CompanyIntro'
import FeaturedProducts from '../components/home/FeaturedProducts'

const HomePage = () => {
  return (
    <div className="flex flex-col gap-6">
      <HeroSection />
      <CompanyIntro />
      <FeaturedProducts />
    </div>
  )
}

export default HomePage
