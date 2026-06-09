import { useSeo } from '../lib/useSeo'
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
  useSeo(
    'ClearWork — GST Invoices, Contracts & Proposals for Indian Freelancers',
    'ClearWork — India\'s all-in-one client workflow. GST invoices, e-signed contracts, Razorpay payments, and proposals in one tool. Built for Indian freelancers and agencies.',
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
