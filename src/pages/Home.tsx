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
    'ClearWork — Client CRM for Freelancers, Consultants & Agencies | Proposals, Invoices & Payments',
    'The all-in-one client CRM for freelancers, consultants, and creative agencies. Send proposals, get contracts e-signed, raise GST invoices, and collect payments — one tool, zero spreadsheets.',
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
