import { useSeo } from '../lib/useSeo'
import { useScrollDepth } from '../hooks/useScrollDepth'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import HubSpokeSection from '../components/HubSpokeSection'
import HowItWorks from '../components/HowItWorks'
import MobileAppSection from '../components/MobileAppSection'
import FeaturesSection from '../components/FeaturesSection'
import PricingSection from '../components/PricingSection'
import FounderNote from '../components/FounderNote'
import WaitlistSection from '../components/WaitlistSection'

export default function Home() {
  useScrollDepth('home')
  useSeo(
    'ClearWork — Client Management Software for Freelancers & Agencies',
    'ClearWork — client management software for freelancers, studios, and agencies. Proposals, contracts, invoices, and payments in one platform.',
    'https://getclearwork.in/',
  )
  return (
    <main>
      <Hero />
      <TrustStrip />
      <HubSpokeSection />
      {/* <FeaturePillars /> */}
      <HowItWorks />
      <MobileAppSection />
      <FeaturesSection />
      <PricingSection />
      <FounderNote />
      <WaitlistSection />
    </main>
  )
}
