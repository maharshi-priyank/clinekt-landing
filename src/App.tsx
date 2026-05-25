import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PainSection from './components/PainSection'
import HowItWorks from './components/HowItWorks'
import FeaturesSection from './components/FeaturesSection'
import PricingSection from './components/PricingSection'
import WaitlistSection from './components/WaitlistSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <PainSection />
        <HowItWorks />
        <FeaturesSection />
        <PricingSection />
        <WaitlistSection />
      </main>
      <Footer />
    </div>
  )
}
