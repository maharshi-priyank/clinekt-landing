import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import PainSection from '../components/PainSection'
import HowItWorks from '../components/HowItWorks'
import FeaturesSection from '../components/FeaturesSection'
import PricingSection from '../components/PricingSection'
import FounderNote from '../components/FounderNote'
import WaitlistSection from '../components/WaitlistSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustStrip />
      <PainSection />
      <HowItWorks />
      <FeaturesSection />
      <PricingSection />
      <FounderNote />
      <WaitlistSection />
    </main>
  )
}
