import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import PainSection from '../components/PainSection'
import FeaturePillars from '../components/FeaturePillars'
import HowItWorks from '../components/HowItWorks'
import MobileAppSection from '../components/MobileAppSection'
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
      <FeaturePillars />
      <HowItWorks />
      <MobileAppSection />
      <FeaturesSection />
      <PricingSection />
      <FounderNote />
      <WaitlistSection />
    </main>
  )
}
