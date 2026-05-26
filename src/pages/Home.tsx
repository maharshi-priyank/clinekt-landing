import Hero from '../components/Hero'
import PainSection from '../components/PainSection'
import HowItWorks from '../components/HowItWorks'
import FeaturesSection from '../components/FeaturesSection'
import PricingSection from '../components/PricingSection'
import WaitlistSection from '../components/WaitlistSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <PainSection />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <WaitlistSection />
    </main>
  )
}
