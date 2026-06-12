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
    'ClearWork — GST Invoices, Contracts & Proposals for Indian Freelancers',
    'ClearWork — all-in-one client workflow for freelancers. GST invoices, e-signed contracts, online payments, and proposals in one tool.',
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
